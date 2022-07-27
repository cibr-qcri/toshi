# Toshi

Toshi: A Cryptocurrency Wallet Explorer.

[![Build Status](https://jenkins.cibr.qcri.org/job/toshi-build/badge/icon)](https://jenkins.cibr.qcri.org/job/toshi-build/)

## Starting

```zsh
# In developement
AMPLITUDE_DEV_API_KEY="REPLACE" docker-compose -f docker-compose.dev.yml up --build --detach

# In production
# Clone the repo in /usr/local directory if not found
cd /usr/local/toshi && git pull
SMTP_PASSWORD="REPLACE" AMPLITUDE_PROD_API_KEY="REPLACE" docker-compose -f docker-compose.prod.yml up --build --detach
```

## Stopping

```zsh
# In developement
# Add --volumes to remove named vols
docker-compose -f docker-compose.dev.yml down

# In production
# Remove all images for a clean start
docker-compose -f docker-compose.prod.yml down --rmi all
```
