# Voting Agents Dataset

## Version and Status
This is an initial version of the data set. It is under active development, which means that the data are subject to change.
The data set is provided "as is" in the hope that it can be useful but without any guarantees.

## Analyzed Phonomena
In the first version of the data set, we'd like to analyze the following phenomena:
- The impact of topic similarity on the ability to learn voter preferences.
- The impact of ideological choices on the ability to learn voter preferences.
- The impact of proposal novelty on the ability to learn voter preferences.
- Technical: the impact of the proposal size on the ability to learn voter preferences.
- Technical: the impact of the writing style on the ability to learn voter preferences.
- Technical: the impact of the number of available historical votes on the ability to learn voter preferences.

Please, note that since the data set is under active development, not all phenomena have been reflected in the data set yet.

## Approach
- Collect proposals covering the broadest possible set of social topics that can be realistically considered for funding.
- Include synthetic voter data that precisely follow one of the major ideologies to test the ability to distinguish higher-level concepts.
- Include real voter data that is not required to be systematic or non-contradictory to ensure that the technology can work in the real world.

## Data format
The data set is organized around the decisions of individual voters. Each file is a list of preference decisions made by a single voter.
For each voter, three files are provided: <voter>-train.json, <voter>-val.json, and <voter>-test.json.
The considered proposals within each file are *not-intersecting*, meaning that the same proposal text shall never occur in two files of the same voter.

Please, note that [Git LFS plugin](https://git-lfs.github.com/) is needed to work with the data archives (*.tar.xz files).

### Storage format
All data is stored in JSON files as an array of objects. Each array must contain at least one record.
Each record is an indivudal pair-wise ranking decision, answering the question "Which proposal of the two is more deserving to be funded?"
Each object has the following attributes:
- title_1 - a title of the first proposal to be compared.
- description_1 - a textual description of the first proposal.
- title_2 - a title of the second proposal.
- description_2 - a textual description of the second proposal.
- preference - the decision of a voter. It can contain only one of three values:
  - "proposal_1" - the first proposal is preferred by the voter.
  - "proposal_2" - the second proposal is preferred by the voter.
  - "indifferent" - the voter does not have a clear preference between the two proposals.

### Data Slices
To analyze the targeted phenomena, a diverse set of preference data will be collected. To make the sources of the data clear, we separate the voter data into slices according to the respective data sources. At the moment the following slices / independent sources are present:

#### Catalyst-CA-45
Preference data are extracted from Cardano Catalyst Community Advisor (CA) assessments, taking only assessors that provided not less than 45 assessments in Funds 6 and 7 cumulatively. The data was prepared in the following way:
- A set of community-advisor ids with the necessary number of assessments in non-Challenge-Setting challenges are taken.
- For each advisor, 45 assessments are randomly selected (without replacement): 30 for the training set, 5 for the validation set, and 10 for the test set.
- Proposal titles are taken directly from the proposal title in the Ideascale.
- Proposal descriptions are combined from Problem, Solution, Experience, and Detailed Plan Ideascale fields. After that HTML is stripped and duplicate whitespace is removed.
- Within each subset (training, validation, and test set) all pairs of proposals are compared using the CA-provided scores.
- Since CAs provide scores in three categories (Impact, Feasibility, and Accountability) the scores are combined according to the following formula: (Impact / 5) * (Feasibility / 5) * (Accountability / 5). This formula makes a stronger distinction between good and bad proposals in comparison to the arithmetic average of the three scores that are used by the Cardano Catalyst team.
