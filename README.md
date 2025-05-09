# Invoice Manager v2
Create and manage your invoices, generate quotes and keep company/customer contacts on record for your business. 

This is a full rebuild of the Invoice Manager project using a Laravel API backend, React SPA frontend and SQL Server for database management.

As before, this is based on a legacy MS Access application from 2003. As per the request of the original clients, this has been made to be more 'MS Access' like in its appearance and usage. However it does not sit on live data.

## Build 1.3
- React + Zustand + TailwindCSS
- Laravel API
- Nginx server
- Sql Server Database
- Containerized for local development environment

## Frontend
The frontend is a React application, with Zustand used for state management. Zustand was chosen for it's scalable barebones nature and without having to create Context Providers or API, leading to a smoother development experience.

The Zustand stores hold a state for each type of record the user is currently on (invoice, quote, customer, etc). 

## SQL Server
Recommend RDS instances for qa and production environments (same server, different databases).

If deploying locally, set up a Windows Server and follow Microsoft instructions or if setting up on Ubuntu follow the instructions [here](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu?view=sql-server-ver16).

Can also be deployed on a Proxmox LXC running Ubuntu (easy to take backups).

