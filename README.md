### Devops with Kubernetes 2022

Here lies exercise projects for `Devops with Kubernetes 2022`.

### Exercise 3.6

**DBaaS pros**

* Dedicated support available due to commercial nature.
* Can often be setup with one command or a click of a button.
* Batteries included i.e easier scaling, backuping and monitoring.
* Integrates well with the service providers other products.

**DBaaS cons**

* Money, money, money.
* More prone to vendor locking.
* Less manual control (arguably a pro).

**DIY database setup pros**

* Free and open source.
* Dedicated support is replaced with a (hopefully) large and (hopefully) helpful community.
* No vendor lock.
* Something like postgres is supported by a crazy amount other tooling (hasura, prisma.io, logstash, grafana etc.) .
* Hackable down to the core.

**DIY database setup cons**

* No one is obliged to help you if something goes wrong or doesn't work.
* Harder to setup and easier to mess things up.
* You need to look into backup, scaling and monitoring options yourself. They probably exist but you need to set those up youreslf too.

### Exercise 3.7

I chose postgres because for this project it really made no difference wether to use google cloud sql or postgres.
I already had postgres setup from earlier exercises so setting up gcsql would have been doing the same work.

If the project would greatly benefit from a DBaaS I certainly would have chosen gcsql.
I also have no personal interest in using proprietary software like google cloud sql since postgres has similar DBaaS implementations elsewhere.

I also have familiarity with psql from work and earlier school projects.

### Exercise 3.8

![Todo logs](logs.png)


