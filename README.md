# Voting Agents

## Voting Agents and Scalable Direct Democracy
One of the biggest problems of the direct-democracy approach to governance is the extremely high requirements for the time of voters to review and analyze proposals. Reviewing just a hundred proposals per month can easily consume the time of the whole society if every voter needs to analyze every proposal. However, to run even moderately-populated cities many more decisions need to be made monthly.

The idea behind Voting Agents is that the preferences of most voters can be learned over time from their previous decisions. This means that in cases when a voter does not have time or is not particularly interested in certain proposals, a voting agent can represent the voter. This makes Direct Democracy scalable to any number of proposals:
- all proposals get feedback from all voters so that the authors can learn and improve;
- voters can budget how much time they must provide to support governance;
- the duration of a governance cycle can be shortened, allowing for quicker decision-making.

## Project Structure

### Data set
The Voting-Agents data set provides a reproducible playground to train, analyze, and evaluate approaches to learning voter preferences from the historical votes. The guiding principles used to create the data set are described in the [Voting Agents Dataset documentation](data/README.md)

### ML Models - Coming Soon
Sample implementations of machine-learning models of Voting Agents.

### User Interface
A user interface for voters to analyze proposals, provide their preferences, and evaluate their voting agents.
The latest technical demo is available at [votingagents.org](https://votingagents.org/).
The source code will be published later after it is good enough for a release.

## License
The code and documentation of this project are distributed under the [GNU GENERAL PUBLIC LICENSE Version 3](LICENSE).
3rd-party assets are distributed under their respective licenses.

## Sponsors
The initial work on this project was sponsored by Cardano Catalyst's Fund7 under [Rapid Funding with ML Voting Agents](https://cardano.ideascale.com/c/idea/383355) proposal.
