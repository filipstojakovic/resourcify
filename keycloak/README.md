To export a Keycloak realm along **with its users**, utilize the Keycloak container terminal with the following command:

`/opt/bitnami/keycloak/bin/kc.sh export --file <file>`

**Token generating from host machine**

To generate access tokens when using Docker Compose with services Keycloak and Backend, follow these steps (Note:
keycloak:8080 refers to the Keycloak container named 'keycloak' on port 8080):

```plaintext
Request Url: http://keycloak:8080/realms/resourcify/protocol/openid-connect/token
Method: POST
Request Body:
{
  "password": "admin",
  "username": "admin",
  "grant_type": "password",
  "client_id": "frontend"
}
```

**Note for Windows (or any other OS):**

Since Windows (or your operating system) may not recognize the hostname `keycloak` you need to add the following entry
to your `hosts` file:

```plaintext
127.0.0.1 keycloak
