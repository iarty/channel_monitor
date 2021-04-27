#!/usr/bin/env bash
set -ex
set -o errexit
set -o pipefail
set -o nounset

if [ "$POSTGRES_USER" == "postgres" ]
then
    echo "creating a backup as the postgres user is not supported, make sure to set the POSTGRES_USER environment variable"
    exit 1
fi

# export the postgres password so that subsequent commands don't ask for it
export PGPASSWORD=$POSTGRES_PASSWORD

echo "creating backup"
echo "---------------"

#FILENAME=$1
FILENAME=hbaggregator_backup_$(date +'%Y_%m_%dT%H_%M_%S').pgsql
#pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER $POSTGRES_DB | gzip > /backups/$FILENAME
mkdir -p /backups
pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER -p $POSTGRES_PORT -Fc $POSTGRES_DB > /backups/$FILENAME
chmod 0777 /backups/$FILENAME


s3cmd put /backups/$FILENAME s3://heartbeatspace/hbaggregator/$FILENAME
echo "successfully created backup $FILENAME"
echo "-------------------------------------"