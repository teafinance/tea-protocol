import json
from pprint import pprint
networkId = "1"
from os import listdir
from os.path import isfile, join
mypath = "/Users/fatel/Desktop/yam-protocol/build/contracts"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
onlyfiles

for file in onlyfiles:
    with open("/Users/fatel/Desktop/yam-protocol/build/contracts/"+file, "r") as f:
        if "json" in file:
            try:
                cleaned = {}
                a = json.loads(f.read())
                cleaned["abi"] = a["abi"]
                cleaned["networks"] = {}
                if (networkId in a["networks"].keys()):
                    cleaned["networks"][networkId] = {}
                    cleaned["networks"][networkId]["links"] = a["networks"][networkId]["links"],
                    cleaned["networks"][networkId]["address"] = a["networks"][networkId]["address"],
                    cleaned["networks"][networkId]["address"] = cleaned["networks"][networkId]["address"][0]
                    cleaned["networks"][networkId]["transactionHash"] = a["networks"][networkId]["transactionHash"]
                with open("/Users/fatel/Desktop/yam-protocol/clean_build/contracts/"+file, "w+") as c:
                    c.write(json.dumps(cleaned))
            except Exception as e:
                print(e)
                print(file)
