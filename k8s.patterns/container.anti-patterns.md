

# Container anti patterns

```

- Attempting to use VM practices on containers.
        
        - How to I update applications running inside containers?
        - How do I ssh in a Docker container?
        - How do I get logs/files from a container?
        - How do I apply security fixes inside a container?
        - How do I run multiple programs in a container?

- Creating Docker files that are not transparent.
        - Solution: write Dockerfiles from scratch instead of adopting existing scripts.


- Creating Dockerfiles that have side effects.
        - Solution: move side effects to your CI/CD solution and keep Dockerfiles side-effect free.

- Confusing images used for deployment with those used for development.
        - Solution: don’t ship development tools and test frameworks into production servers.

        - The deployment images should contain:
               - The application code in minified/compiled form plus 
                 its runtime dependencies.
               - Nothing else. Really nothing else.

        - The second category is the images used for the CI/CD systems or developers and might contain:

                - The source code in its original form (i.e. unminified)
                - Compilers/minifiers/transpilers
                - Testing frameworks/reporting tools
                - Security scanning, quality scanning, static analyzers
                - Cloud integration tools
                - Other utilities needed for the CI/CD pipeline

- Building different images per environment.
        -  Solution: build an image only once and promote it across various environments

- Pulling code from git into production servers and building images on the fly
        - Solution: use a Docker registry

- Promoting git hashes between teams
        - Solution: promote container images between teams

- Hardcoding secrets into container images
        -  Solution: build an image only once and use runtime configuration injection

- Using Docker as poor man’s CI/CD
        -  Solution: use Docker as a deployment artifact and choose a CI/CD solution for CI/CD

- Assuming that containers are a dumb packaging method
        - Solution: Create Dockerfiles that compile/package source code on their own from scratch

```