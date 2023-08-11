import json
import glob
from types import SimpleNamespace
tags = open('./src/lib/jsons/tags.json', 'w')

uniqueTags = set()
for filename in glob.iglob('./event_data/**/*.json', recursive=False):
    data = open(filename, 'r')
    jsonData = json.load(data)
    dumpData = json.dumps(jsonData)

    serializeData = json.loads(dumpData, object_hook=lambda d: SimpleNamespace(**d))

    try:
        serializeData.upcoming
    except AttributeError:
        pass
    else:
        if serializeData.upcoming == False:
            uniqueTags.update(serializeData.tags)

    data.close()


listUniqueTags = list(uniqueTags)
listUniqueTags.sort()
tags.write(json.dumps(listUniqueTags, indent=4))
tags.close()
