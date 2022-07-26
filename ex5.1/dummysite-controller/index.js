import k8s from '@kubernetes/client-node'
import k8sOperator from '@dot-i/k8s-operator'

const { default: Operator, ResourceEventType } = k8sOperator

const getDeploymentJSON = (dummySiteName, dummySiteUrl) => {
    return {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "name": `${dummySiteName}-dep`
        },
        "spec": {
            "selector": {
                "matchLabels": {
                    "app": dummySiteName
                }
            },
            "replicas": 1,
            "template": {
                "metadata": {
                    "labels": {
                        "app": dummySiteName
                    }
                },
                "spec": {
                    "containers": [
                        {
                            "name": `${dummySiteName}-container`,
                            "image": "santlemp/dummysite",
                            "env": [
                                {
                                    "name": "WEBSITE_URL",
                                    "value": `${dummySiteUrl}`
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }

}

class DummysiteOperator extends Operator {

    k8sApi

    async init() {
        console.log('Initializing dummysite operator')
        const kc = new k8s.KubeConfig()
        kc.loadFromDefault()
        this.k8sApi = kc.makeApiClient(k8s.AppsV1Api)
        await this.watchResource('stable.dwk', 'v1', 'dummysites', async (e) => {
            try {
                if (e.type === ResourceEventType.Added || e.type === ResourceEventType.Modified) {
                    await this.createDummySite(e);
                }
            } catch (err) {
                console.log('Could not handle dummysite event:', e)
            }
        })
    }

    async createDummySite(e) {
        const crd = e.object
        const dummysiteUrl = crd.spec.website_url
        const dummySiteName = crd.metadata.name
        const namespace = crd?.metadata?.namespace
        const deployment = getDeploymentJSON(dummySiteName, dummysiteUrl)
        try {
            console.log('Creating dummysite for url:', dummysiteUrl)
            await this.k8sApi.createNamespacedDeployment(namespace, deployment)
        } catch (err) {
            console.log('Failed to create deployment for dummysite', err)
        }
    }
}

const run = async () => {
    const operator = new DummysiteOperator()
    await operator.start()
    const exit = (reason) => {
        console.log('Exiting:', reason)
        operator.stop()
        process.exit(0)
    }
    process
        .on('SIGTERM', () => exit('SIGTERM'))
        .on('SIGINT', () => exit('SIGINT'))
}

run()
