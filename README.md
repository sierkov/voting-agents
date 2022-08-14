# Voting Agents

## Voting Agents and Scalable Direct Democracy
One of the biggest problems of the direct-democracy approach to governance is the extremely high requirements for the time of voters to review and analyze proposals. Reviewing just a hundred proposals per month can easily consume the time of the whole society if every voter needs to analyze every proposal. However, to run even moderately-populated cities many more decisions need to be made monthly.

The idea behind Voting Agents is that applied modern technologies can help reduce the minimum necessary time commitment from voters, and thus allow scaling direct-democracy to the new level.
The key technological ideas are:
- Ask voters to select best 3 ideas according to their preferences instead of review all.
- Use modern machine-learning models to support proposal discovery through semantic search, personalized recommendations, and presentation of similar proposals. Think of using Netflix/Amazon like discovery tools but for the discovery of community proposals.
- After a voter has participated in several cycles of voting and the personalized recommendations models are good enough, allow voters to approve the ML model (a voting agent) to represent their opinions in cases when they don't have time to participate personally.

In addition, the suggested voting workflow has the following components:
- final approval of the voting decisions in a decentralized way - by a randomly-selected subset of voters;
- three feedback loops (to voters, to approvers, and to proposers) to ensure that the funding objectives and the process requirements relevant to a community are met.

## Project Structure

### User Interface
A user interface for allowing voters to quicker solve the voting tasks by leveraging modern discovery technologies. The technical demo is available at [www.votingagents.org](https://votingagents.org/). More information about the UI can be found in the [README file for User Interface](ml/README.md)

### ML Models
Sample implementations of machine-learning models supporting Voting Agents style of voting:
- A semantic search model.
- Proposal similarity model.
- Personalized proposal recommendation (a voting agent) model.
More information the ML models can be found in the [README file for Machine Learning models](ml/README.md)

### Data set
The Voting-Agents a sample data set suitable as a reproducible playground to train, analyze, and evaluate approaches to learning voter preferences from the historical votes. The guiding principles used to create the data set are described in the [Voting Agents Dataset documentation](data/README.md)

## License
The code and documentation of this project are distributed under the [GNU GENERAL PUBLIC LICENSE Version 3](LICENSE).
3rd-party assets are distributed under their respective licenses.

## Sponsors
The initial work on this project was sponsored by Cardano Catalyst's Fund7 under [Rapid Funding with ML Voting Agents](https://cardano.ideascale.com/c/idea/383355) proposal.
