'''
TO DO
v. analyse de l'armature
v. crea de dossier en fonction de l'expe
v. crea .csv par participant
v. crea .csv de tt les participants
v. modif de fichier tt les participants
-.add file readme explication des table de score
'''


import os
import csv
import shutil





class CSVManager:

    '''

    CSVManager can manage, build and modify .csv file to save datas from the app

    >   __init__(parentPath) --------------------------------------------------- parentPath = resultPath

    __ PUBLIC FUNCTIONS __

    >   getArchOfParentPath() -------------------------------------------------- return dictionary of the architecture of the parent path :: exemple = {expe1 : [group1, group2], expe2 : []}
    >   createNewProfil(nameProfil, namesGroups = []) -------------------------- create a profil with a folder named from "nameProfil"(str), a .csv file Result.csv in this folder for results from all participants, and (if "namesGroups"([list]) is not equal to an empty list) create subfolders for the differents groups
    >   addValues(nameProfil, participantId, values) --------------------------- Add value to the .csv || args :: nameProfil(str) = name expe :: participantID(str) = id subject :: values([list]) = values to add (with weight for the first trial)

    __ PRIVATE FUNCTIONS __

    >   __createTable(tablePath, columns) -------------------------------------- Create a new table in "tablePath"(str) with "columns"([list]) element set
    >   __writeTable(tablePath, content) --------------------------------------- ReWrite the table from 'tablepath'(str) with content ([[list of rows]])
    >   __buildStructure(type, criteria, nbtrials) ----------------------------- return column([list]) or row([[List]]) build from a pattern with custom 'nbtrial'(int)
    >   __getAll(tablePath) ---------------------------------------------------- return the table([[list of rows]]) from 'tablePath'(str)
    >   __addReadme() ----------------------------------------------------------
    >

    '''

    def __init__(self, parentPath):
        self.parentFolder = parentPath


    ''' __ PUBLIC FUNCTIONS __ '''

    def getArchOfParentPath(self):
        # Table of the architecture
        arch = {}
        # list of experiences in parent path
        experiences = os.listdir(self.parentFolder)
        # loop for all experiences
        for expe in experiences:
            # verification of the content type is a folder
            if os.path.isdir(self.parentFolder+"/"+expe):
                # list of groups in path of expe
                groups = os.listdir(self.parentFolder+"/"+expe)
                # returned value for groups
                returnedGroups = {}
                # loop on group
                for group in groups:
                    # verification of the content type is a folder
                    if os.path.isdir(self.parentFolder+"/"+expe+"/"+group):
                        # list of participant Ids in path of group
                        ids = os.listdir(self.parentFolder+"/"+expe+"/"+group)
                        # add list of participant to group returned value
                        returnedGroups[group] = ids
                # add the expe and his group to the architecture Table
                arch[expe] = returnedGroups
        # return the architecture table of the parent path :: to keep only the expe use arch.keys()
        return arch

    def createNewProfil(self, nameProfil, namesGroups, criteria):
        # Architecture of the actual directory
        oldArch = self.getArchOfParentPath()
        # If a profil with the same name is encounted
        if nameProfil in oldArch.keys() :
            # return error
            return {"error":1, "result":"Profile %s already exist !"%(nameProfil)}
        # If it's all good
        else:
            # creation of the folder for the new profil
            try:
                os.mkdir(self.parentFolder+"/"+nameProfil)
            except OSError:
                return {"error":1, "result":"Creation of Experience directory in %s failed !" %(self.parentFolder+"/"+nameProfil)}
            # creation of the folder for the group inside the new profil folder
            for group in namesGroups:
                try:
                    os.mkdir(self.parentFolder+"/"+nameProfil+"/"+group)
                except OSError:
                    # if error : supress folder profil and return error
                    shutil.rmtree(self.parentFolder+"/"+nameProfil, ignore_errors=True)
                    return {"error":1, "result":"Creation of group %s directory in %s failed !" %(group, self.parentFolder+"/"+nameProfil+"/"+group)}
            # creation of the table for all participants
            cols = self.__buildStructure("column", criteria, 1)
            self.__createTable(self.parentFolder+"/"+nameProfil+"/Scores.csv", cols, "column")
            # return all good
            return {"error":0, "result":self.getArchOfParentPath()}

    def createParticipantResult(self, nameProfil, nameGroup, participantId, scores):
        if nameGroup == "None":
            pathChunkGroup = ""
        else:
            pathChunkGroup = "/"+nameGroup
        path = self.parentFolder+"/"+nameProfil+pathChunkGroup+"/"+participantId+".csv"
        if not os.path.isdir(self.parentFolder+"/"+nameProfil):
            print({"error":1, "result":"Directory %s doesn't exist !"%(self.parentFolder+"/"+nameProfil)})
            return
        elif not os.path.isdir(self.parentFolder+"/"+nameProfil+pathChunkGroup):
            print({"error":2, "result":"Directory %s doesn't exist !"%(self.parentFolder+"/"+nameProfil+pathChunkGroup)})
            return
        elif not os.path.isfile(path):
            table = self.__buildStructure("row", self.__getSelectedCriteria(self.parentFolder+"/"+nameProfil+"/Scores.csv"))
            #participant's csv creation
            self.__createTable(path, table, "row")
        #save datas
        self.__addProfilFileValues(nameProfil, participantId, scores)
        self.__addIndividualScore(path, scores)


    ''' __ PRIVATE FUNCTIONS __ '''

    def __createTable(self, tablePath, table, type):
        # create table in path
        with open (tablePath, 'w') as f:
            myTable = csv.writer(f, dialect='unix',delimiter = ';')
            if type == "column":
                # create first rows in table
                myTable.writerow(table)
            if type == "row":
                for row in table:
                    myTable.writerow(row)
    def __writeTable(self, tablePath, content):
        # create table in path
        with open (tablePath, 'w') as f:
            myTable = csv.writer(f, dialect='unix',delimiter = ';')
            for element in content:
                # create rows in table
                myTable.writerow(element)
    def __buildStructure(self, type, criteria, nbtrials=1):
        #basic structure
        weightItems = []
        tlxItems = ["TlxGlobal"]
        exactItems = ["ExactGlobal"]
        print(criteria)
        for criterium in criteria:
            weightItems.append("Weight"+criterium)
            tlxItems.append("Tlx"+criterium)
            exactItems.append("Exact"+criterium)
        #if it's for general scores file
        if type == "column":
            #base of the column
            structure = ["Participants"]+weightItems
            #counter
            x=1
            # if counter is inferior or egal to the number of trial
            while x<=nbtrials:
                # add cusstom trialID to basic item and add it to columns
                for item in tlxItems:
                    structure.append(item+"_trial%s"%x)
                for item in exactItems:
                    structure.append(item+"_trial%s"%x)
                x+=1;
        #if it's for participant file
        elif type == "row":
            structure = [["Criteria"]]
            #set weight
            i=0
            while i<len(criteria):
                structure.append([weightItems[i]])
                i+=1
            #set criteria
            i=0
            while i<(len(criteria)+1):
                structure.append([tlxItems[i]])
                i+=1
            i=0
            while i<(len(criteria)+1):
                structure.append([exactItems[i]])
                i+=1
        # return result
        return structure

    def __getAll(self, tablePath):
        #read table from path
        with open (tablePath, 'r') as f:
            myTable = csv.reader(f, dialect='unix',delimiter = ';')
            # create variable datas
            datas = []
            # save row values in datas
            for row in myTable:
                datas.append(row)
        # return datas
        return datas
    def __getSelectedCriteria(self, tablePath):
        #read table from path
        with open (tablePath, 'r') as f:
            myTable = list(csv.reader(f, dialect='unix',delimiter = ';'))
            # extract criteria
            firstrow = myTable[0]
            selectedCriteria = [];
            for item in firstrow:
                if "_trial1" in item:
                    if "Tlx" in item:
                        if not "Global" in item:
                            selectedCriteria.append(item.replace("_trial1", "").replace("Tlx", ""))
        # return datas
        return selectedCriteria

    def __addProfilFileValues(self, nameProfil, participantId, values):
        # values format {critère:score}
        filepath = self.parentFolder+"/"+nameProfil+"/"+"Scores.csv"
        # existing value
        tableValues = self.__getAll(filepath)
        headerTable = tableValues[0]
        # verification of the existence of participantID in the existing value
        alreadyExist = False;
        for row in tableValues:
            if row[0] == participantId:
                alreadyExist = tableValues.index(row)
        # extract the first row (title of column) and loop it
        nbtrial = headerTable[len(headerTable)-1]
        nbtrial = int(nbtrial[len(nbtrial)-1])
        patternOfStructure = []
        for item in headerTable:
            if "Weight" in item:
                patternOfStructure.append(item)
            elif "_trial1" in item:
                patternOfStructure.append(item.replace("_trial1", ""))
        # If it's a new participantID
        if alreadyExist == False:
            dataToSave = [participantId]
            for item in patternOfStructure:
                if item in values:
                    dataToSave.append(values[item])
            # add values to the table
            tableValues.append(dataToSave)
            #write on the .csv
            self.__writeTable(filepath, tableValues)
        # If is not a new participantID
        else:
            # nombre de critère de la structure
            nbStructItems = (len(headerTable)-1)/nbtrial
            # participant trial
            particiantNbTrial = (len(tableValues[alreadyExist])-1)/nbStructItems
            # look for match
            if nbtrial == particiantNbTrial:
                headerTable = self.__buildStructure("column",self.__getSelectedCriteria(filepath), nbtrial+1)
            tableValues[0] = headerTable
            #Add value to the table
            dataToSave = tableValues[alreadyExist]
            for item in patternOfStructure:
                # MAJ des weightScore if exist
                if "Weight" in item:
                    #check if exist
                    if item in values.keys():
                        #extract index
                        index = headerTable.index(item)
                        #replace data
                        dataToSave[index] = values[item]
                else:
                    # Création des nouvelle entrée
                    if item in values:
                        dataToSave.append(values[item])
            #write on the .csv
            self.__writeTable(filepath, tableValues)
    def __addIndividualScore(self, path, scores):
        # scores format {critère:score}
        #get table
        content = self.__getAll(path)
        #set column title
        content[0].append("Score_trial%s"%len(content[0]))
        #set new value in content
        for key in scores.keys():
            i=0
            while i<len(content):
                if content[i][0] == key:
                    content[i].append(scores[key])
                    i+=len(content)
                else:
                    i+=1
        #write on the .csv
        self.__writeTable(path, content)

        '''
        #merge criterias and score list in one array
        for i in range(len(criterias)):
            temp = []
            temp.append(criterias[i])
            temp.append(scores[i])
            individualTable.append(temp)

        return individualTable
        '''

    def __addReadme(self):
        'Ici add readme file pour explication des valeurs des colones du csv'




if __name__ == '__main__':

    path = "U:/Desktop/_ICTDATAS_"
    myManager = CSVManager(path)

    nameProfil = "test"
    #nameProfil = "testLess3"
    criteria = ["Physical", "Effort", "Frustration"]
    groups = ["A", "B"]
    #myManager.createNewProfil(nameProfil, groups, criteria)

    nameGroup = "A"
    participantID = "id7"
    scores = {
            "WeightMental":"4", "WeightPhysical":"1", "WeightTemporal":"3", "WeightPerformance":"1", "WeightEffort":"4", "WeightFrustration":"2",
            "TlxGlobal":"92", "TlxMental":"45", "TlxPhysical":"23", "TlxTemporal":"56", "TlxPerformance":"78", "TlxEffort":"4", "TlxFrustration":"12",
            "ExactGlobal":"92", "ExactMental":"45", "ExactPhysical":"23", "ExactTemporal":"56", "ExactPerformance":"78", "ExactEffort":"4", "ExactFrustration":"12"
                }
    scoresUpg = {
            "WeightMental":"1000", "WeightPhysical":"1001",
            "TlxGlobal":"9092", "TlxMental":"9045", "TlxPhysical":"9023", "TlxTemporal":"9056", "TlxPerformance":"9078", "TlxEffort":"904", "TlxFrustration":"9012",
            "ExactGlobal":"9092", "ExactMental":"9045", "ExactPhysical":"9023", "ExactTemporal":"9056", "ExactPerformance":"9078", "ExactEffort":"904", "ExactFrustration":"9012"
                }
    scoresLess3 = {
            "WeightPhysical":"1", "WeightEffort":"4", "WeightFrustration":"2",
            "TlxGlobal":"92", "TlxPhysical":"23", "TlxEffort":"4", "TlxFrustration":"12",
            "ExactGlobal":"92", "ExactPhysical":"23", "ExactEffort":"4", "ExactFrustration":"12"
                }
    myManager.createParticipantResult(nameProfil, nameGroup, participantID, scoresUpg)
