# Voting Agents Dataset
The data set has been created based on the Cardano Catalyst proposals presented in Funds 4, 5, 6, and 7.

## Version and status
This is an initial version of the data set. It is "under development", which means that the data is not final and subject to change.
The data is provided on as is basis in the hope that it can be helpful.

## Analyzed Phonomena
In the first version of the data set, we'd like to analyze the following phenomena:
- The impact of topic similarity on the ability to learn voter preferences.
- The impact of ideological choices on the ability to learn voter preferences.
- The impact of proposal novelty on the ability to learn voter preferences.
- Technical: the impact of the proposal size on the ability to learn voter preferences.
- Technical: the impact of the writing style on the ability to learn voter preferences.
- Technical: the impact of the number of available hisorical votes on the ability to learn voter preferences.

Please, note that since the data set is under active development not all phenomena have been reflected in the data set yet.

## Approach
- A set of textual proposals covering diverse social topics.
- A set of sythetic voters that precisely follow one of major idealogies.
- A set of real voters who are not required to be systematic or follow a given ideology.
- A set of proposals is set aside and never appears in the training data to test the ability of models to generalize the learnings to completely new proposals.

## Data format
The data set is organized around the decisions of individual voters. Each file is a list of preference decisions made by a single voter.
For each voter, three files are provided: <voter>-train.json, <voter>-val.json, and <voter>-test.json.
The considered proposals within each file are *not-intersecting*, meaning that the same proposal text shall never occur in two files of the same voter

### Storage format
- title_1 - a title of Proposal 1.
- description_1 - a textual description of Proposal 1.
- title_2 - a title of Proposal 2.
- description_2 - a textual description of Proposal 2.
- preference - "proposal_1", "proposal_2" or "indifferent"
  - "proposal_1" - Proposal 1 is preferred to Proposal 2
  - "proposal_2" - Proposal 2 is preferred to Proposal 1.
  - "indifferent" - the voter does not have a clear preference.

### Data Slices
To analyze the targeted phenomena, a diverse set of preference data will be collected. To make the sources of the data clear, we separate the voter data in slices accoring to the respective data sources. At the moment the following slices / independent sources are present:

#### Catalyst-CA-45

Preference data are extracted from Cardano Catalyst Community Advisor (CA), taking assessments of assessors that not less than 45 assessments in Funds 6 and 7 cumulatively. The data was prepared in the following way:
- A set of community advisor ids with the necessary number of assessments in non Challenge-Setting challenges are taken.
- For each advisor, 45 assessment are randomly selected (without replacement): 30 for the training set, 5 for the validation set, and 10 for the test set.
- Within each subset (training, validation, and test set) all pairs of proposals are compared using the CA provided scores.
- Since CAs provide scores in three categories (Impact, Feasbility, and Accountability) the scores are compbined according to the following formula: (Impact / 5) * (Feasibility / 5) * (Accountability / 5). This formula makes a stronger distinction between good and bad proposals in comparison to the arithmetic average of the three scores that is used by the Cardano Catalyst team.
