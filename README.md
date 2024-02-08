For development only: <br/>
`
docker compose -f .\docker-compose-dev.yml up -d -V --build
`

For complete build and run: <br/>
`
docker compose up -d -V --build
`

To rebuild and start specific service from docker compose: 
`
docker-compose up -d --no-deps --build <service_name>
`

[Keycloak configuration](./keycloak/README.md).

![plot](./Concepts/resourcify_concept.png)
<img src="./Concepts/use-case.gif"/>
