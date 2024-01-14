# Keycloak: Client Scopes and Configuration for RabbitMQ OAuth2

When RabbitMQ receives a JWT token, it validates it before accepting it. **Audience must have/match the
resource_server_id**.
The `aud` `(Audience) identifies the recipients and/or resource_server of the JWT. By default, RabbitMQ uses this field
to validate the token although you can deactivate it by setting verify_aud to false. When it set to true, this attribute
must either match the resource_server_id setting or in case of a list, it must contain the resource_server_id.
[Read Token validation](https://www.rabbitmq.com/oauth2.html#token-validation)

## I) Configure Client Scopes

1. Navigate to the "Client Scopes" section in your Keycloak admin console.

2. Create a new client scope, e.g., `audience-mapping-service`.

3. Within the settings of the newly created `audience-mapping-service`, go to the "Mappers" tab.

4. Create a Protocol Mapper:
  1) Choose Mapper type: Audience.
  2) Name: my-client-audience.
  3) Included Client Audience: my-client.
  4) dd to access token: On.

## II) Configure Client `my-client`

1. Access the "Clients" menu in your Keycloak admin console.
2. Find and select the client `my-client`.
3. In the "Client Scopes" tab within `my-client` settings:

- Add the newly created client scope, `audience-mapping-service`, to assigned default client scopes.

These steps ensure proper configuration for handling client scopes and audience mappings in Keycloak.
