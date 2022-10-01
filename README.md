# <a href="https://www.stroo.app"><img src="app/public/svgs/logo.svg" alt="Stroo" width="80px" /></a>

Create interactive software structures.

<img src="readme/structure-example.png" alt="Structure example" width="30%" />

## Motivation

This webapp was created to be used like a documentation for software structures and be easily shareable as best practices.

## Development

```bash
# install packages, just at the first time
docker-compose run web npm ci
docker-compose up
```

## Tests

```bash
docker-compose run web npm test
```

## TODO

- [ ] Increase TDD coverage
- [ ] Embed support
- [ ] Bash file with commands to create structure
