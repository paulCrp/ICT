import sys
import os
import pathlib
from configparser import ConfigParser

from PyQt5 import QtCore, QtWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWidgets import QApplication, QFileDialog, QWidget
from PyQt5.QtCore import QUrl, QObject, QDir

import _resourcesJS




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

# Class to execute py function from js for save score in localfile
class FeedbackScores(QtCore.QObject):
    @QtCore.pyqtSlot(str)
    def getRef(self, x):
        print("Datas : ", x)

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
    #return QDir.fromNativeSeparators(config.get('PATH','resultpath'))
    return config.get('PATH','resultpath').replace('"', '').replace('\\', '/');
# set config file value
def setConfigFileValue(myvalue):
    config = ConfigParser()
    config.read(mypath+'/_config.ini')
    # set value
    config.set("PATH", "resultpath", myvalue)



if __name__ == '__main__':

    #Load application
    app = QApplication(sys.argv)
    #a=FinderFolder().open(mypath)
    #print(a)
    # Create object for saving scores in local files
    feedback_scores = FeedbackScores()

    #Load webBrowser
    webBrowser = QWebEngineView()

    #Debug js in python console
    webBrowser.setPage(WebEnginePage(webBrowser))

    #Disable rightContextMenu
    webBrowser.setContextMenuPolicy(QtCore.Qt.NoContextMenu)

    # Create channel for comunicate to JS
    channel = QtWebChannel.QWebChannel()
    webBrowser.page().setWebChannel(channel)
    channel.registerObject("feedback_scores", feedback_scores)

    #load .html file
    p = mypath+"/_app/index.html";
    webBrowser.load(QUrl(p))

    # path of the saving result directory
    resultPath = getConfigFileValue()
    # set result path in JS
    webBrowser.loadFinished.connect(onLoadFinished)

    #Show window
    webBrowser.show()#showMaximized here!

    #Execute App
    sys.exit(app.exec_())
