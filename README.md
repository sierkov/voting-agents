# Voting Agents

## How Voting Agents solve the biggest problem of Direct Democracy
One of the biggest problems of direct-democracy approach to governance is the extreme requirements for the the time of voters. A proposal flow of just a hundred proposals per month can already comsume the time of the whole society if every voter needs to analyze every proposal.

The central idea behind Voting Agents is that preferences of most voters can be learned over time from their previous decisions, and that a voting agent can reduce the required time by representing the voter's opinion when the voter does not have time to personally analyze a  specific proposal. One can think of voting agents as a representative democracy on steroids, where the representatives have all the time in the world to learn each voter's needs personally.

## Project Structure

### Data set
The Voting Agent's data set provides a reproduceable playground to train, analyze, and evaluate approaches to learning a voter's preferences from the previous votes. The guiding principles used to create the data set are presented in the [Voting Agents Dataset documentation](doc/dataset.md)

### ML Models
We provide sample implementations of Voting Agents.

### User Interface
We provide a user interface that can be used by voters to train their personalized Voting Agents.
One of the use cases for the user interface is to provide a Rapid Funding mechanism for the Cardano's Catalyst project.

## License
The Voting Agents data and code are distributed under the [GNU GENERAL PUBLIC LICENSE version 3](LICENSE)

## Sponsors
The initial work on this project was funded in 2022 by Cardano Catalyst's Fund7 under [Rapid Funding with ML Voting Agents](https://cardano.ideascale.com/c/idea/383355) proposal.

## Author
The concept and the initial implementation have be made by Oleksandr (Alex) Sierkov.