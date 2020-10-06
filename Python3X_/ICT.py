import sys
import pathlib
from configparser import ConfigParser

from PyQt5 import QtCore, QtWebChannel
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl, QObject

import _resourcesJS




'''
>
>
>
'''



# Js debugger for python console
class WebEnginePage(QWebEnginePage):
    def javaScriptConsoleMessage(self, level, message, lineNumber, sourceID):
        print("javaScriptConsoleMessage: ", level, message, lineNumber, sourceID)

# Class to execute py function from js for save score in localfile
class FeedbackScores(QtCore.QObject):
    @QtCore.pyqtSlot(str)
    def getRef(self, x):
        print("inside getRef", x)

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
    config.read('_config.ini')
    # return resultPath value
    return config.get('PATH','resultpath').replace('"', '').replace('\\', '/');
# set config file value
def setConfigFileValue(myvalue):
    config = ConfigParser()
    config.read('_config.ini')
    # set value
    config.set("PATH", "resultpath", myvalue)



if __name__ == '__main__':
    #Load application
    app = QApplication(sys.argv)

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

    #Find current path
    mypath = pathlib.Path(__file__).parent.absolute()
    #Rename path
    mypath = str(mypath).replace("\\", "/")
    #load .html file
    webBrowser.load(QUrl(mypath+"/_app/index.html"))

    # path of the saving result directory
    resultPath = getConfigFileValue()
    # set result path in JS
    webBrowser.loadFinished.connect(onLoadFinished)

    #Show window
    webBrowser.show()#showMaximized here!


    #Execute App
    sys.exit(app.exec_())
