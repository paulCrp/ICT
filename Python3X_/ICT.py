import sys
import os
import pathlib
from configparser import ConfigParser
from PyQt5 import QtCore, QtWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWidgets import QApplication, QFileDialog, QWidget
from PyQt5.QtCore import QUrl, QObject, QDir
import json

import _resourcesJS
from buildCSV import CSVManager




'''
>
>
>
'''



# Find current path for the app
mypath = pathlib.Path(__file__).parent.absolute()
#Returns pathName using ‘/’ as file separator. On Windows, for instance, (“c:\\winnt\\system32 “) returns “c:/winnt/system32”.
mypath = QDir.fromNativeSeparators(str(mypath))

# Js debugger for python console
class WebEnginePage(QWebEnginePage):
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)








class ConfigFileManager():
    """

    :: Read and write in config.ini file ::

    >
    > __init__() --------------------------------------------------------------- initiate the configparser and the path of the configFile
    >
    > getAll() ----------------------------------------------------------------- return all the value of the configFile :: exemple -> {'resultpath': 'None', 'defaultvalues': {'language': 'EN', 'version': 'Short', 'criteria': "['Mental', 'Physical', 'Temporal', 'Performance', 'Effort', 'Frustration']"}}
    > get_resultPath() --------------------------------------------------------- return value of "resultpath" item
    > get_DefaultValues() ------------------------------------------------------ return all default value :: exemple -> {'language': 'EN', 'version': 'Short', 'criteria': "['Mental', 'Physical', 'Temporal', 'Performance', 'Effort', 'Frustration']"}
    > get_DVlanguage() --------------------------------------------------------- return value of "language" item :: "EN" or "FR"
    > get_DVversion() ---------------------------------------------------------- return value of 'version' item :: "Short" or "Long"
    > get_DVcriteria() --------------------------------------------------------- return value of 'criteria' item :: str(List) of criteria selected
    >
    > setAll(resultPathValue, defaultValues) ----------------------------------- set 'resultPathValue'[str] and 'defaultValues'[List[langageValue, versionValue, criteriaValues]] to the configFile ::
    > set_resultPath(value) ---------------------------------------------------- set 'resultPathValue'[str]
    > set_DefaultValues(values) ------------------------------------------------ set 'defaultValues' [List[langageValue, versionValue, criteriaValues]]
    > set_DVlanguage(value) ---------------------------------------------------- set "language" value
    > set_DVversion(value) ----------------------------------------------------- set "version" value
    > set_DVcriteria(value) ---------------------------------------------------- set 'criteria' value
    >

    """

    def __init__(self):
        self.config = ConfigParser()
        self.configfile_path = mypath+'/_config.ini'
        self.config.read(self.configfile_path)

    def getAll(self):
        return {'resultpath':self.get_resultPath(), 'defaultvalues':self.get_DefaultValues()}
    def get_resultPath(self):
        return QDir.fromNativeSeparators(self.config.get('PATH','resultpath'))
    def get_DefaultValues(self):
        return {'language':self.get_DVlanguage(), 'version':self.get_DVversion(), 'criteria':self.get_DVcriteria()}
    def get_DVlanguage(self):
        return self.config.get('DEFAULT_VALUES','language')
    def get_DVversion(self):
        return self.config.get('DEFAULT_VALUES', 'version')
    def get_DVcriteria(self):
        return json.loads(self.config.get('DEFAULT_VALUES', 'criteria'))

    def setAll(self, resultPathValue, defaultValues):
        self.config['PATH'] = {"resultpath" : QDir.fromNativeSeparators(str(resultPathValue))}
        self.config['DEFAULT_VALUES'] = {"language" : values["language"], 'version' : values["version"], 'criteria' : values["criteria"]}
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)
    def set_resultPath(self, value):
        self.config['PATH'] = {"resultpath" : QDir.fromNativeSeparators(str(value))}
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)
    def set_DefaultValues(self, values):
        self.config['DEFAULT_VALUES'] = {"language" : values["language"], 'version' : values["version"], 'criteria' : values["criteria"]}
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)
    def set_DVlanguage(self, value):
        self.config['DEFAULT_VALUES']['language'] = value
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)
    def set_DVversion(self, value):
        self.config['DEFAULT_VALUES']['version'] = value
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)
    def set_DVcriteria(self, value):
        self.config['DEFAULT_VALUES']['criteria'] = value
        with open(self.configfile_path, 'w') as file:
            self.config.write(file)








# CHANNEL
# Class to execute py function from js for save score in localfile
class FeedbackScores(QtCore.QObject):
    @QtCore.pyqtSlot(str)
    def getRef(self, x):
        print(x)

#DATA RECEIVERS

class QtC_openFolderFinder(QtCore.QObject):

    '''

    :: QtC_openFolderFinder() :: Class triggerd by the javascript to open file explorer and select a new directory or create one

    __ PUBLIC FUNCTIONS __

    >
    > __init__() --------------------------------------------------------------- it's possible to set the name of result folder here
    > triggerFt(x) ------------------------------------------------------------- Main ft call by JS :: (! In future release x can be use for selecting import a folder or create a folder)
    >

    __ PRIVATE FUNCTIONS __

    >
    > __isAnIctResultFolder(path) ---------------------------------------------- Bool :: return True if the last item of hierarchy of the arg "path" is equal to the default name of result folder, False if not
    > __createNewFolder(path) -------------------------------------------------- if it's possible create a folder with the default name of result folder in "path" :: return Dict = {"path":"thePath", "error":int(range 0-2*)} :: *error 0 = no error, 1 = resultFolder already exxist here, 2= other error
    >

    '''

    # :: PUBLIC ::

    def __init__(self, *args, **kwargs):
        super(QtC_openFolderFinder, self).__init__(*args, **kwargs)
        #name of result folder here
        self.nameOfResultFolder = "_ICTDATAS_"

    #function called by js
    @QtCore.pyqtSlot(str, result=str)
    def triggerFt(self, x):
        # open file explorer
        newFolderPath = FinderFolder().open(mypath);
        # if the result from the file explorer is not equa to None
        if newFolderPath != None:
            # if it's not an importation of an existent ict result folder
            if not self.__isAnIctResultFolder(newFolderPath):
                # create a new result folder
                resultForJs = self.__createNewFolder(newFolderPath)
            # if it's an importation of an existent ict result folder
            else:
                # get architecture of result path
                arch = CSVManager(newFolderPath).getArchOfParentPath()
                # set the resut to return for js side
                resultForJs = {"path": newFolderPath, "error":0, "arch":arch}
            # if no errors occured
            if resultForJs["error"] == 0:
                # save the path in config.ini file
                ConfigFileManager().set_resultPath(resultForJs["path"])
            # return result to js
            return json.dumps(resultForJs)
        else:
            #No folder has selected by the file explorer
            return json.dumps({"path": "None", "error":3, "arch":"unused value"})

    # :: __PRIVATE__ ::

    def __isAnIctResultFolder(self, newPath):
        mypath = QDir.fromNativeSeparators(str(newPath))
        mypath = mypath.split('/')
        if mypath[len(mypath)-1] == self.nameOfResultFolder:
            return True
        else:
            return False
    def __createNewFolder(self, newPath):
        mypath = QDir.fromNativeSeparators(str(newPath))
        mypath = mypath+"/"+self.nameOfResultFolder
        if os.path.isdir(mypath):
            return {"path":"None", "error":1, "arch":"unused value"}
        else:
            try:
                os.mkdir(mypath)
                arch = CSVManager(mypath).getArchOfParentPath()
                return {"path":mypath, "error":0, "arch":arch}
            except:
                return {"path":"None", "error":2, "arch":"unused value"}

class QtC_getsetStoredDatas(QtCore.QObject):

    '''

    :: QtC_getsetStoredDatas() :: Class triggerd by the javascript to save and retrieved datas
    (in all function x is the value send by js)

    >
    > getDatas(x) -------------------------------------------------------------- Ft to retrieve datas call by JS
        > x="initValues" ------------------------------------------------------- send value of the initialisation software to JS :: return {'resultpath': 'str', 'defaultvalues': {'language': 'str', 'version': 'str', 'criteria': [List]}, 'arch': {Dict}}
        >
    > setDefaultValues(x) ------------------------------------------------------ save default values in config.ini file :: x = {'language': 'str', 'version': 'str', 'criteria': [List]}
    > createNewProfile(x)
    >

    '''

    # Ft to retrieve datas call by JS
    @QtCore.pyqtSlot(str, result=str)
    def getDatas(self, x):
        # if the js call the values at the initialisation of the software
        if x=="initValues":
            # retrieve all the value of the config.ini file
            values = ConfigFileManager().getAll()
            # set the architecture of the result folder to "None" by default
            archOfResultFolder = "None"
            # If the resultpath set in config.ini is not equal to "None"
            if values["resultpath"] != "None":
                # check if the path exist
                if os.path.isdir(values["resultpath"]):
                    # if exist set the value of the architecture of the result folder
                    archOfResultFolder = CSVManager(values["resultpath"]).getArchOfParentPath()
                # if not exist
                else:
                    # Reset the value of path of result folder to "None" in config.ini
                    ConfigFileManager().set_resultPath("None")
                    # Reset the value of path of result folder to "None" in the send values for JS
                    values["resultpath"] = "None"
            # Add the value for architecture of the folder result to the send values for JS
            values["arch"] = archOfResultFolder
            # Send values to JS
            return json.dumps(values)

    # Ft call by js to set default values in config.ini file by the JS
    @QtCore.pyqtSlot(str, result=str)
    def setDefaultValues(self, x):
        values = json.loads(x)
        values["criteria"] = json.dumps(values["criteria"])
        ConfigFileManager().set_DefaultValues(values)
        returnvalues = ConfigFileManager().get_DefaultValues()
        return json.dumps(returnvalues)

    # Ft call by js to create a new profile
    @QtCore.pyqtSlot(str, result=str)
    def createNewProfile(self, x):
        values = json.loads(x)
        resutPath = ConfigFileManager().get_resultPath()
        result = CSVManager(resutPath).createNewProfil(values["name"], values["groups"], values["criteria"])
        return json.dumps(result)

    # Ft call by js to create a new profile
    @QtCore.pyqtSlot(str, result=str)
    def setResultDatas(self, x):
        values = json.loads(x)
        print(values)
        result = "ok"
        return json.dumps(result)
    





# Class to build custom widget to open a file manager for finding a folder path
class FinderFolder(QWidget):
    """
    Custom Qt Widget open os file manager for selecting path for a folder.
        - Use it by doing a=FinderFolder().open(mypath) :: [mypath]=(str)"starting explorer path" :: print(a) = path of new folder selected
    """

    def __init__(self, *args, **kwargs):
        super(FinderFolder, self).__init__(*args, **kwargs)

    def open(self, path):
        # open select folder dialog
        fname = QFileDialog.getExistingDirectory(
            self, 'Select a folder for saving ICT datas', path)
        if fname:
            # Returns pathName with the '/' separators converted to separators that are appropriate for the underlying operating system.
            fname = QDir.toNativeSeparators(fname)
            return fname











# Call js function to set the result directory when the page is loaded :: resultPath need to be set before the call of this function
def onLoadFinished(ok):
    if ok:
        print(resultPath)
        webBrowser.page().runJavaScript("setRep(\"%s\")"%resultPath)

# get config file value
def getConfigFileValue():
    # creation of config object
    config = ConfigParser()
    # read config file
    a= config.read(mypath+'/_config.ini')
    # return resultPath value
    return QDir.fromNativeSeparators(config.get('PATH','resultpath'))
# set config file value
def setConfigFileValue(myvalue):
    config = ConfigParser()
    config.read(mypath+'/_config.ini')
    # set value
    config.set("PATH", "resultpath", myvalue)













if __name__ == '__main__':

    #Load application
    app = QApplication(sys.argv)

    #Load webBrowser
    webBrowser = QWebEngineView()

    #Debug js in python console
    webBrowser.setPage(WebEnginePage(webBrowser))

    #Disable rightContextMenu
    webBrowser.setContextMenuPolicy(QtCore.Qt.NoContextMenu)

    # Create channel for comunicate to JS
    channel = QtWebChannel.QWebChannel()
    webBrowser.page().setWebChannel(channel)
    # Create objects for linked action with js trigger
    #feedback_scores = FeedbackScores()
    #channel.registerObject("feedback_scores", feedback_scores)
    qtc_openFolderFinder = QtC_openFolderFinder()
    channel.registerObject("openFolderFinder", qtc_openFolderFinder)
    qtc_getsetStoredDatas = QtC_getsetStoredDatas()
    channel.registerObject("getsetStoredDatas", qtc_getsetStoredDatas)

    #load .html file
    indexHtml = mypath+"/_app/index.html";
    webBrowser.load(QUrl(indexHtml))

    # path of the saving result directory
    resultPath = getConfigFileValue()
    # set result path in JS
    webBrowser.loadFinished.connect(onLoadFinished)

    # set the minimum size of the window
    webBrowser.setMinimumSize(400, 400)

    #Show window
    webBrowser.show()#showMaximized here!

    #Execute App
    sys.exit(app.exec_())
