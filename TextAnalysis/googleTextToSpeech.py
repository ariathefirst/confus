import math, random
def transcribe_gcs_with_word_time_offsets(gcs_uri, matrix):
    """Transcribe the given audio file asynchronously and output the word time
    offsets."""
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
    client = speech.SpeechClient()

    audio = types.RecognitionAudio(uri=gcs_uri)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code='en-US',
        enable_word_time_offsets=True)

    operation = client.long_running_recognize(config, audio)

    print('Waiting for operation to complete...')
    result = operation.result(timeout=70)

    print("starts analyzing text")
    confused_sentence_list = [] # each sentence is input to NLU
    # alternatives occur if there's more than 1 speaker
    for result in result.results:
        for alternative in result.alternatives:
            print(u'Transcript: {}'.format(alternative.transcript))
            print('Confidence: {}'.format(alternative.confidence))
            
            confused_sentence = [] # stop indicates change of topic
            for word_info in alternative.words:
                word = word_info.word

                start_time = word_info.start_time
                start_time_sec = word_info.start_time.seconds + start_time.nanos * 1e-9
                                
                end_time = word_info.end_time
                end_time_sec = word_info.end_time.seconds + end_time.nanos * 1e-9

                time_interval = range(math.floor(start_time_sec), math.ceil(end_time_sec))
                cur_word_confusion_ct = 0
                for viewer in matrix:
                    if (any(viewer[t] == 1) for t in time_interval):
                        cur_word_confusion_ct += 1
                if cur_word_confusion_ct > len(matrix) // 2: # more than half are confused about cur word
                    confused_sentence.append(word)

                print('Word: {}, start_time: {}, end_time: {}'.format(
                    word,
                    start_time_sec,
                    end_time_sec))
            confused_sentence_list.append(' '.join(confused_sentence))

    print("confused_sentence_list:\n", confused_sentence_list)
    return confused_sentence_list 

gcs_uri = "gs://confus/output.wav"
ex = [random.randint(0,1) for i in range(259)]
matrix = [ex for i in range(3)]
print("matrix:\n", matrix)
transcribe_gcs_with_word_time_offsets(gcs_uri, matrix)


