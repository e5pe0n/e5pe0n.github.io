# Operation

## Don't update packages on servers already serviced in

don't update packages on running servers already serviced in with no consideration like by

```sh
sudo apt upgrade
```

this may cause unexpected high cpu-usage and memory. worse, the package of new version is not compatible with the previous version or configuration changes possibly. these may result in service down.
