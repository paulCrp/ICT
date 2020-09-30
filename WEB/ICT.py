import sys
import pathlib
from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWidgets import QApplication



#Load application
app = QApplication(sys.argv)

#Find current path
mypath = pathlib.Path(__file__).parent.absolute()
#Rename path
mypath = str(mypath).replace("\\", "/")

#Load webBrowser
web = QWebEngineView()
#load .html file
web.load(QUrl(mypath+"/index.html"))
#Show webBrowser
web.show()

#Execute App
sys.exit(app.exec_())
