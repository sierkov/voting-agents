# Voting Agents Dataset
The data set has been created based on the Cardano Catalyst proposals presented in Funds 4, 5, 6, and 7.

## Version and status
This is an initial version of the data set. It is "under development", which means that the data is not final and subject to change.
The data is provided on as is basis in the hope that it can be helpful.

## Analyzed Phonomena
In the first version of the data set, we'd like to analyze the following phenomena:
- The impact of topic similarity on the ability to learn voter preferences.
- The impact of ideological choices on the ability to learn voter preferences.
- Technical: the impact of the proposal size on the ability to learn voter preferences.
- Technical: the impact of the writing style on the ability to learn voter preferences.
- Technical: the impact of the number of available hisorical votes on the ability to learn voter preferences.

Please, note that since the data set is under active development not all phenomena have been reflected in the data set yet.

## Approach
- A set of textual proposals covering diverse social topics.
- A set of sythetic voters that precisely follow one of major idealogies.
- A set of real voters who are not required to be systematic or follow a given ideology.

## Data format
- title_1 - a title of Proposal 1.
- description_1 - a textual description of Proposal 1.
- title_2 - a title of Proposal 2.
- description_2 - a textual description of Proposal 2.
- preference - "proposal_1", "proposal_2" or "indifferent"
  - "proposal_1" - Proposal 1 is preferred to Proposal 2
  - "proposal_2" - Proposal 2 is preferred to Proposal 1.
  - "indifferent" - the voter does not have a clear preference.
