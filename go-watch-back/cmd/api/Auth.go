package main

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// Auth é uma struct que armazena as configurações necessárias para gerenciar tokens JWT
type Auth struct {
	Issuer        string        // Identificador do emissor do token
	Audience      string        // Público-alvo do token
	Secret        string        // Chave secreta usada para assinar os tokens
	TokenExpiry   time.Duration // Tempo de validade do token de acesso
	RefreshExpiry time.Duration // Tempo de validade do token de refresh
	CookiePath    string        // Caminho do cookie no navegador
	CookieDomain  string        // Domínio do cookie
	CookieName    string        // Nome do cookie
}

// jwtUser representa as informações do usuário que serão incluídas no token
type jwtUser struct {
	ID        int    `json:"id"`         // Identificador único do usuário
	FirstName string `json:"first_name"` // Nome do usuário
	LastName  string `json:"last_name"`  // Sobrenome do usuário
}

// TokenPairs armazena um par de tokens: um de acesso e outro de refresh
type TokenPairs struct {
	Token        string `json:"access_token"`  // Token de acesso
	RefreshToken string `json:"refresh_token"` // Token de refresh
}

// Claims define as reivindicações do token JWT
type Claims struct {
	jwt.RegisteredClaims // Inclui as reivindicações padrão do JWT
}

// GenerateTokenPair gera um par de tokens (access e refresh) a partir das informações do usuário
func (j *Auth) GenerateTokenPair(user *jwtUser) (TokenPairs, error) {
	//Criando um token
	token := jwt.New(jwt.SigningMethodHS256)
	//Definir as reivindicações

	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = fmt.Sprintf("%s %s", user.FirstName, user.LastName)
	claims["sub"] = fmt.Sprint(user.ID)
	claims["aud"] = j.Audience
	claims["iss"] = j.Issuer
	claims["iat"] = time.Now().UTC().Unix()
	claims["typ"] = "JWT"

	//Definir a expiração

	claims["exp"] = time.Now().UTC().Add(j.TokenExpiry).Unix()

	//Createa signed token

	signedAccessToken, err := token.SignedString([]byte(j.Secret))
	if err != nil {
		return TokenPairs{}, err
	}
	//Criando um refresh toekn e set claims
	refreshToken := jwt.New(jwt.SigningMethodHS256)
	refreshTokenClaims := refreshToken.Claims.(jwt.MapClaims)

	refreshTokenClaims["sub"] = fmt.Sprint(user.ID)
	refreshTokenClaims["iat"] = time.Now().UTC().Unix()

	//Definindo a expiry para o refresh token
	refreshTokenClaims["exp"] = time.Now().UTC().Add(j.TokenExpiry).Unix()
	//Criando signed refresh token
	signedRefreshToken, err := refreshToken.SignedString([]byte(j.Secret))
	if err != nil {
		return TokenPairs{}, err
	}
	//Criando token pairs e populando com signed tokens

	var tokenPairs = TokenPairs{
		Token:        signedAccessToken,
		RefreshToken: signedRefreshToken,
	}

	//Return tokenpairs
	return tokenPairs, nil
}
