"""

This file manage the communication channel between python an javascript on python side :
    - js side call function from python side (can be void function or can expected a result)

exemple of the basic use :

#PY SIDE

mymsg = "sentence need to be retrieved by js side"

#class for initiate the object of the communication between langage
class QtC_getStoredDatas(QtCore.QObject):
    #Set a slot like this (with type of transmitted variable and the type of the return* of the next function) *not needed if you don't need to get result datas from js
    @QtCore.pyqtSlot(str, result=str)
    #Create one or more function called in the js side (always with x[= value send by the js side])
    def getDatas(self, x):
        print("pyConsole : "+x)
        if x=="initDatas":
            return mymsg

# after QApplication(sys.argv) and QWebEngineView() :
app = QApplication(sys.argv)
webBrowser = QWebEngineView()
# initiate the channel
channel = QtWebChannel.QWebChannel()
# connect the channel to the QWebEngineView() object
webBrowser.page().setWebChannel(channel)
# Instantiate you're class relatve of the object of the communication between python and js
qtc_getStoredDatas = QtC_getStoredDatas()
# Register one or more object to trigger action by the js side
channel.registerObject("getStoredDatas", qtc_getStoredDatas)

#JS SIDE

// create a function to get datas from python (or just execute python function)
function qtC_getStoredDatas(){
    // Create a connector to the channel initialized in python side
    new QWebChannel(qt.webChannelTransport, function(channel){
        // Call the object to trigger action by the js
        getStoredDatas = channel.objects.getStoredDatas;
        // Execute the function from the QtC_getStoredDatas() class you want :: x= message you want to pass to python side from js, pyval = the value returned by the python side
        getStoredDatas.getDatas(x, function(pyval){
            // Do what you want with the datas you get from python side
            console.log("console js : "+pyval)
        });
    });
}

"""
