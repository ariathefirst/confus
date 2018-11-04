import math, random
from googleTextToSpeech import transcribe_gcs_with_word_time_offsets
from ibmAPI import conceptExtraction

gcs_uri = "gs://confus/output.wav"
ex = [random.randint(0,1) for i in range(259)]
matrix = [ex for i in range(3)]
print("matrix:\n", matrix)
confused_sentence_list = transcribe_gcs_with_word_time_offsets(gcs_uri, matrix)
for sentence in confused_sentence_list:
	conceptExtraction(sentence)
