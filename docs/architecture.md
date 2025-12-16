# Understand the project architecture

## Hexagonal architecture

My own interpretation of the famous hexagonal architecture. The goal of such an architecture is to separate concerns in
layers.
Each layer will have a purpose, and a layer will not be aware of what happens in the layer above.
Let's dig in the layers going from the most inner to most outward:

### Layers

#### Entities

Entities are the purest form of the domain logic. They should aim to be pure TypeScript without any dependencies.
They should mirror a real life object or a concept.

#### Domain services

Domain services are somewhat optional, their job is to orchestrate the domain logic between multiple entities.
Therefore, if one entity can do the job, they might not be useful.

#### Use cases

Use cases have the same goal as the domain services, but they are also the only place to communicate with the "outside
world".
They will be the one to tell entities (or domain services) what to do.
Once this is done, they will be in charge to tell the database to persist the changes, the email provider to send the
email, or the events system that something happened.
Since use cases are called by the [interface layer](), they are also in charge to respond to them. This might need data
formatting.

#### Interface & Infrastructure

The first layer has two sides: the interface and the infrastructure.

**Interface**

This layer's job is to **interface** between the user and the domain of our application.
It will take the user input and relay it to the domain logic in a way it can understand.
The most common interfaces we know are "HTTP controllers", "Event Listeners" and "CLIs".
Each of these interfaces are either triggered by a user or another app.
They will be the ones to interpret what the user wants using the [use cases]().

**Infrastructure**

The infrastructure, as well as the interface, can have multiple faces.
The most common are, as described in the [use case layer](), databases, email / sms providers, 3rd part APIs, event
queues, etc.

### Ports and Adapters

To achieve the separation of concerns when it comes to the [infrastructure layer]() we use the principle of Inversion of
Dependency.
What it means is that you will not depend on an implementation but on an abstraction.
Let's take an example: you have a use case where you want to get the distance between a user, and a place he wants to
go.
You can take the Google Maps API to achieve this. The problem is that if you put the Google Maps logic in your domain
logic, it will
no longer be only your domain.
Imagine for a sec Google Maps increases its pricing, and you can no longer afford it.
You find a cheaper alternative, but you look at your code only to realize that each use case have Google Maps logic
inside it.
To migrate, you have to dig your use cases and know what is your domain's logic and what is GMap's.

With ports and adapters, you use case will not need to change a bit.

The way to do this is to create an interface **(not related to the layer)** and make your use cases call them.
You define in the interface what your use case sends to the "Geo API" as well as what it should return.
Make your business logic based on that and voilà.
Once this is done, you can create the implementation (adapter) of your abstraction (interface).
In our case, the first adapter will be the "Geo Google Maps API" and when Google Maps is no longer affordable, you
create a new
implementation "Geo Alternative API". Instead of injecting the Google Maps implementation you just need to inject the
"Alternative" one!

## Folders

If you read the [hexagonal architecture]() section, I will now explain how to translate it into the folder tree
structure.

Starting at the [source root directory](../src), you will have the "domain" folders. Each of these folder represents
a domain. What a domain is, is explained [here]().

When you enter the named domain, you will find the actual layers we talked
about: [interface](), [infrastructure](), [domain]().

### Interface

In here you will find the interfaces the domain uses. It can be HTTP, WebSocket, CLIs, Event Listener, etc.
In each one you will also find a "DTO" folder, a kind of helper to map entities going in to the one used in the
domain.

### Infrastructure

Here, you will find the implementations (adapters) of the interfaces (ports) your use cases depend on.
