'''
TO DO
v. analyse de l'armature
v. crea de dossier en fonction de l'expe
-. crea .csv par participant
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
    >   __buildColumn(nbtrials) ------------------------------------------------ return columns([list]) build from a pattern with custom 'nbtrial'(int)
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
            # list of groups in path of expe
            groups = os.listdir(self.parentFolder+"/"+expe)
            # add the expe and his group to the architecture Table
            arch[expe] = groups
        # return the architecture table of the parent path :: to keep only the expe use arch.keys()
        return arch

    def createNewProfil(self, nameProfil, namesGroups = []):
        # Architecture of the actual directory
        oldArch = self.getArchOfParentPath()
        # If a profil with the same name is encounted
        if nameProfil in oldArch.keys() :
            # return error
            return [1, "Profil already exist !"]
        # If it's all good
        else:
            # creation of the folder for the new profil
            try:
                os.mkdir(self.parentFolder+"/"+nameProfil)
            except OSError:
                return [1, "Creation of Experience directory in %s failed !" %(self.parentFolder+"/"+nameProfil)]
            # creation of the folder for the group inside the new profil folder
            for group in namesGroups:
                try:
                    os.mkdir(self.parentFolder+"/"+nameProfil+"/"+group)
                except OSError:
                    # if error : supress folder profil and return error
                    shutil.rmtree(self.parentFolder+"/"+nameProfil, ignore_errors=True)
                    return [1, "Creation of group %s directory in %s failed !" %(group, self.parentFolder+"/"+nameProfil+"/"+group)]
            # creation of the table for all participants
            cols = self.__buildColumn(1)
            print(cols)
            self.__createTable(self.parentFolder+"/"+nameProfil+"/Scores.csv", cols)
            # return all good
            return [0, "Profil created"]

    def createParticipantResultFile(self, nameProfil, nameGroup, participantID, values):
        ''




    ''' __ PRIVATE FUNCTIONS __ '''

    def __createTable(self, tablePath, columns):
        # create table in path
        with open (tablePath, 'w') as f:
            myTable = csv.writer(f, dialect='unix',delimiter = ';')
            # create first rows in table
            myTable.writerow(columns)
    def __writeTable(self, tablePath, content):
        # create table in path
        with open (tablePath, 'w') as f:
            myTable = csv.writer(f, dialect='unix',delimiter = ';')
            for element in content:
                # create rows in table
                myTable.writerow(element)
    def __buildColumn(self, nbtrials):
        #base of the column
        columns = ["Participants", "WeightMental", "WeightPhysical", "WeightTemporal", "WeightPerformance", "WeightEffort", "WeightFrustration"]
        #Similar item per trials
        basicItem = [
            "TlxGlobal", "TlxMental", "TlxPhysical", "TlxTemporal", "TlxPerformance", "TlxEffort", "TlxFrustration",
            "ExactGlobal", "ExactMental", "ExactPhysical", "ExactTemporal", "ExactPerformance", "ExactEffort", "ExactFrustration"
                    ]
        #counter
        x=1
        # if counter is inferior or egal to the number of trial
        while x<=nbtrials:
            # add cusstom trialID to basic item and add it to columns
            for item in basicItem:
                columns.append(item+"_trial%s"%x)
            x+=1;
        # return result
        return columns

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

    def __addProfilFileValues(self, nameProfil, participantId, values):
        filepath = self.parentFolder+"/"+nameProfil+"/"+"Scores.csv"
        # existing value
        tableValues = self.__getAll(filepath)
        # verification of the existence of participantID in the existing value
        alreadyExist = False;
        for row in tableValues:
            if row[0] == participantId:
                alreadyExist = tableValues.index(row)
        # If it's a new participantID
        if alreadyExist == False:
            #Insert participant Id to values
            values.insert(0, participantId)
            # add values to the table
            tableValues.append(values)
            #write on the .csv
            self.__writeTable(filepath, tableValues)
        # If is not a new participantID
        else:
            #calculate number trials
            nbtrial = (len(tableValues[0])-7)/14
            # here alreadyExist = index of row value for the participantId
            participantNbExistingValues = (len(tableValues[alreadyExist])-7)/14
            #if it's new value for a participant but you have the same number of values between header of column and row from participant you need to add new column for new trial
            if nbtrial == participantNbExistingValues:
                tableValues[0] = self.__buildColumn(nbtrial+1)
            #Add value to the table
            tableValues[alreadyExist] = tableValues[alreadyExist] + values
            #write on the .csv
            self.__writeTable(filepath, tableValues)

    def __addReadme(self):
        'Ici add readme file pour explication des valeurs des colones du csv'




if __name__ == '__main__':

    path = "U:/Documents/NASATLX_result"
    myManager = CSVManager(path)
    exemplevalues = ["WeightMental", "WeightPhysical", "WeightTemporal", "WeightPerformance", "WeightEffort", "WeightFrustration",
    "TlxGlobal", "TlxMental", "TlxPhysical", "TlxTemporal", "TlxPerformance", "TlxEffort", "TlxFrustration",
    "ExactGlobal", "ExactMental", "ExactPhysical", "ExactTemporal", "ExactPerformance", "ExactEffort", "ExactFrustration"]
    dotValues = ["TlxGlobal", "TlxMental", "TlxPhysical", "TlxTemporal", "TlxPerformance", "TlxEffort", "TlxFrustration",
    "ExactGlobal", "ExactMental", "ExactPhysical", "ExactTemporal", "ExactPerformance", "ExactEffort", "ExactFrustration"]
    #i = myManager.createNewProfil("test")
    myManager.addValues("test", "Id1", dotValues)
    #t = csv.writer(open ("U:/Documents/NASATLX_result/test3/Scores.csv", 'w'), dialect='unix',delimiter = ';')
    #t.writerow(["additional rows1", "additional rows 2"])
    #print(i)
