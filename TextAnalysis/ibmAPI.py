import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
from watson_developer_cloud.natural_language_understanding_v1 \
    import Features, CategoriesOptions, EntitiesOptions, KeywordsOptions, ConceptsOptions
apikey = "kMI_wK9Z3tSx4RRo0I_SPncIosIumYf0rpzsKBnRd12c"
url = "https://gateway.watsonplatform.net/natural-language-understanding/api"

"""
NLU for text
"""
def conceptExtraction(sentence):
  # with open(json_file) as f:
  #     data = json.load(f)
  # data = data[data.keys()[0]]

  naturalLanguageUnderstanding = NaturalLanguageUnderstandingV1(
    version='2018-09-21',
    iam_apikey=apikey,
    url=url)

  response = naturalLanguageUnderstanding.analyze(
    text=sentence,
    features=Features(
      concepts=ConceptsOptions(
        limit=100),
      keywords=KeywordsOptions(
        limit=100))).get_result()
  print(json.dumps(response, indent=2))

# conceptExtraction(sentence)



