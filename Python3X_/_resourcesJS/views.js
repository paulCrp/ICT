/*******************************************************************************
********************************************************************************
********************************************************************************


uiBuilder.js

Ici gestion de l'interface utilisateur et des modules permettant l'affichage de l'application



:: VARIABLES ::


:: APP.PAGE.HOMEPAGE ::


:: APP.PAGE.RULES ::


:: APP.PAGE.CHOICE ::


:: TOOLS ::


:: NOTES ::




********************************************************************************
********************************************************************************
*******************************************************************************/

function pageStyle(page="testpage"){
  if (page == "home"){
    document.body.style.background = "linear-gradient(135deg, #2D6E96 20%, #04273D 110%);";
    document.getElementById("CONTAINER").innerHTML = "";
    document.getElementById("HEADER").style.background = "transparent";
  }
  else{
    document.body.style.background = "White";
    document.getElementById("CONTAINER").innerHTML = "";
    document.getElementById("HEADER").style.background = "black";
  }
}

/******************************************************************************* APP.VIEW  multiviewcontent*/

function buildAdviceElement(parent, advice){
  addElement("div", parent, "adviceElement_container_", "adviceElement_container_");
  addElement("div", document.getElementById("adviceElement_container_"), "adviceElement_content_", "adviceElement_content_", advice);
  addElement("div", document.getElementById("adviceElement_container_"), "adviceElement_line_", "adviceElement_line_");
  addElement("div", document.getElementById("adviceElement_container_"), "adviceElement_additionalNote_", "adviceElement_additionalNote_");
}
function buildNextBtn(parent, content, eventFt, type="rules"){
  // build BTN
  addElement("div", parent, "nextBtnElement_container_", "nextBtnElement_container_");
  addElement("div", document.getElementById("nextBtnElement_container_"), "nextBtnElement_content_", "nextBtnElement_content_", content);
  // mouse event
  document.getElementById("nextBtnElement_content_").addEventListener('mouseenter', event => {
    document.getElementById("nextBtnElement_content_").style.background = 'black';
    document.getElementById("nextBtnElement_content_").style.color = 'white';
  });
  document.getElementById("nextBtnElement_content_").addEventListener('mouseleave', event => {
    document.getElementById("nextBtnElement_content_").style.background = 'white';
    document.getElementById("nextBtnElement_content_").style.color = 'black';
  });
  // Si le boutont est appelé lors de la rules.page
  if (type == "rules"){
    // click event
    document.getElementById("nextBtnElement_content_").addEventListener("click", function(){
      asumptionCheck = onClickValidRulesPage();
      if (asumptionCheck){
        eventFt();
      }
    });
  }
  // Si le boutont est appelé lors de la weight.page
  else{
    // click event
    document.getElementById("nextBtnElement_content_").addEventListener("click", function(){
      eventFt();
    });
  }
}








/******************************************************************************* APP.HOMEPAGE */

class ShowHomepage{

  /*

    :: showHomepage() ::

      class permettant d'afficher la page home et gérer l'ensemble des sous-module relatif à la page d'accueil :
        - gestion des paramètre de l'application
        - gestion des profils
        - création de profils
        - gestion de la page d'info


  > constructor() -------------------------------------------------------------- Initialisation de la class :: set external working values by default and initialize the UI module

  :: UPDATE ::

  > _init() -------------------------------------------------------------------- Initialize module
  > updateUiHomepage() --------------------------------------------------------- Update ui element of homepage compared to external working value

  :: PRIMARY MODULE ::

  > buildUI_homepage() --------------------------------------------------------- build homepage
    > clickOnLanguageBtn() ----------------------------------------------------- click btn language
    > clickOnVersionBtn() ------------------------------------------------------ click btn version
  > buildUI_info() ------------------------------------------------------------- build infos page
  > buildUI_settings() --------------------------------------------------------- build settings page
    > clickOnLanguageBtn() ----------------------------------------------------- click btn language
    > clickOnVersionBtn() ------------------------------------------------------ click btn version
  > buildUI_profilManager() ---------------------------------------------------- build profil manager page
  > pm_loadfromHome() ---------------------------------------------------------- call buildUI_profilManager() from homepage
  > pm_loadfromAw() ------------------------------------------------------------ call buildUI_profilManager() when AW window is alredy activated
  > buildUI_createProfile() ---------------------------------------------------- build page "create profil"
    > addGroup(name) ----------------------------------------------------------- Function to add froup to group container :: arg name(str)("None" by default) = name of the group if the added group alredy exist
    > refreshGroup() ----------------------------------------------------------- rebuild the group container with new parameters
    > clickOnCreate() ---------------------------------------------------------- click btn create
  > cp_loadfromHome() ---------------------------------------------------------- call buildUI_createProfile() from homepage
  > cp_loadFromAw () ----------------------------------------------------------- call buildUI_createProfile() when AW window is alredy activated

  :: ADDITIONAL MODULES ::

  > AW_openWindow() ------------------------------------------------------------ Open additionnal window above homepage
  > AW_closeWindow(updateUiHomepage) ------------------------------------------- Close additional window :: updateUiHomepage is this.updateUiHomepage
  > buildCriteriasBox(parent) -------------------------------------------------- Build criterias choice box
    > initBufferListCriteria() ------------------------------------------------- update external working value bufferCheckedCriteriasBox
    > setCheckboxValue() ------------------------------------------------------- set value of bufferCheckedCriteriasBox variable in the ui module
    > checkboxIsChecked(checkbox) ---------------------------------------------- click on "checkbox" action
    > sortBufferList(bufferlist) ----------------------------------------------- Sort buffer list like the original pattern :: return the new sorted list

  :: NOTES ::
    - Tout les submodule son appelé depuis un appuis boutons sur la homepage (seul la page create profil peut être appelé depuis la page profil manager si aucun profil n'existe)
    - La "second window" positionné sur la première, en calque, et dans les même proportion, est appelé à chaque lancement de submodule

  */

  constructor(){
    // Liste de critère TLX sélectionné lorsque un build de choix de buildCriteriasBox() est appelé
    bufferCheckedCriteriasBox = [];
    // Id of the page
    homepageId = "HOME";
    // Variable
    var selectedParticipantId = "";
    // Initialisation
    this._init();
  }

  /******************************************************************* UPDATE */

  _init(){
    // stle homepage
    pageStyle("home");
    // Build structure
    this.buildUI_homepage();
  }

  updateUiHomepage(){
    console.log(defaultlanguage)
    console.log(defaultversion)
    if (defaultlanguage == "EN"){
      document.getElementById("HPAGE_languageEN").className = 'W_selectBtn';
      document.getElementById("HPAGE_languageFR").className = 'W_unselectBtn';
    }
    else{
      document.getElementById("HPAGE_languageFR").className = 'W_selectBtn';
      document.getElementById("HPAGE_languageEN").className = 'W_unselectBtn';
    }
    if (defaultversion == "Short"){
      document.getElementById("HPAGE_versionShort").className = 'W_selectBtn';
      document.getElementById("HPAGE_versionLong").className = 'W_unselectBtn';
    }
    else{
      document.getElementById("HPAGE_versionLong").className = 'W_selectBtn';
      document.getElementById("HPAGE_versionShort").className = 'W_unselectBtn';
    }
  }

  /*********************************************************** PRIMARY MODULE */

  buildUI_homepage(){
    /* HOMEPAGE FRAME */
    addElement("div", document.getElementById("CONTAINER"), "HPAGE_homepage_container");
    /* TITLE AND SUBTITLE */
    addElement("div", document.getElementById("HPAGE_homepage_container"), "HPAGE_title_container");
    addElement("div", document.getElementById("HPAGE_title_container"), "HPAGE_title", "None", "ICT");
    //addElement("div", document.getElementById("HPAGE_title_container"), "HPAGE_subtitle", "None", "From NASA Task Load Index");
    /* PARAMETERS CONTAINER*/
    addElement("div", document.getElementById("HPAGE_homepage_container"), "HPAGE_parametersContainer");
    addElement("img", document.getElementById("HPAGE_parametersContainer"), "HPAGE_informationBtn", "HPAGE_iconMain", "None", iconAdd);
    document.getElementById('HPAGE_informationBtn').setAttribute('title', 'Infos');
    document.getElementById("HPAGE_informationBtn").addEventListener("click", evt => this.buildUI_info(evt))
    addElement("img", document.getElementById("HPAGE_parametersContainer"), "HPAGE_optionBtn", "HPAGE_iconMain", "None", iconAdd);
    document.getElementById('HPAGE_optionBtn').setAttribute('title', 'Settings');
    document.getElementById("HPAGE_optionBtn").addEventListener("click", evt => this.buildUI_settings(evt))
    addElement("img", document.getElementById("HPAGE_parametersContainer"), "HPAGE_profileManagerBtn", "HPAGE_iconMain", "None", iconAdd);
    document.getElementById('HPAGE_profileManagerBtn').setAttribute('title', 'Manage profiles');
    document.getElementById("HPAGE_profileManagerBtn").addEventListener("click", evt => this.pm_loadfromHome(evt))
    addElement("img", document.getElementById("HPAGE_parametersContainer"), "HPAGE_profileBtn", "HPAGE_iconMain", "None", iconAdd);
    document.getElementById('HPAGE_profileBtn').setAttribute('title', 'Add profile');
    document.getElementById("HPAGE_profileBtn").addEventListener("click", evt => this.cp_loadfromHome(evt))
    /* MAIN CONTAINER*/
    addElement("div", document.getElementById("HPAGE_homepage_container"), "HPAGE_mainContainer");
    /* PROFILE CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_profile_container");
    addElement("div", document.getElementById("HPAGE_profile_container"), "HPAGE_chooseProfil", "None", "Choose a profile");
    addElement("div", document.getElementById("HPAGE_profile_container"), "HPAGE_sepaLine");
    /* EXPERIENCE CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_expContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_expContainer"), "HPAGE_expLabel", "HPAGE_elementLabel", "Experimentation :");
    addElement("div", document.getElementById("HPAGE_expContainer"), "HPAGE_expChoice", "HPAGE_elementChoice", getTransformedChoosenHomeValue('expe', choosenexperiment));
    addElement("img", document.getElementById("HPAGE_expContainer"), "HPAGE_expbtn", "HPAGE_elementChooseBtn", "None", iconAdd);
    document.getElementById("HPAGE_expbtn").addEventListener("click", (e) => {this.buildListingPage("expe")} );
    document.getElementById('HPAGE_expbtn').setAttribute('title', 'Choose an experiment');
    /* GROUP CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_groupContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_groupContainer"), "HPAGE_groupLabel", "HPAGE_elementLabel", "Group :");
    addElement("div", document.getElementById("HPAGE_groupContainer"), "HPAGE_groupElement", "HPAGE_elementChoice", getTransformedChoosenHomeValue("group", choosengroup));
    addElement("img", document.getElementById("HPAGE_groupContainer"), "HPAGE_groupbtn", "HPAGE_elementChooseBtn", "None", iconAdd);
    document.getElementById("HPAGE_groupbtn").addEventListener("click", (e) => {this.buildListingPage("group")} );
    document.getElementById('HPAGE_groupbtn').setAttribute('title', 'Choose a group');
    /* ID CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_idContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_idContainer"), "HPAGE_idLabel", "HPAGE_elementLabel", "Participant ID :");
    addElement("input", document.getElementById("HPAGE_idContainer"), "HPAGE_IdElement");
    document.getElementById("HPAGE_IdElement").addEventListener("focusout", (e) => { this.selectedParticipantId = document.getElementById("HPAGE_IdElement").value });
    addElement("img", document.getElementById("HPAGE_idContainer"), "HPAGE_idbtn", "HPAGE_elementChooseBtn", "None", iconAdd);
    document.getElementById("HPAGE_idbtn").addEventListener("click", (e) => {this.buildListingPage("id")} )
    document.getElementById('HPAGE_idbtn').setAttribute('title', 'Choose existing Id');
    /* NB TRIAL */
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_nbTrialContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_nbTrialContainer"), "HPAGE_nbTrialLabel", "HPAGE_elementLabel", "Trials :");
    addElement("div", document.getElementById("HPAGE_nbTrialContainer"), "HPAGE_nbTrialElement", "None", "-");
    /* LANGUAGE CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_languageContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_languageContainer"), "HPAGE_languageLabel", "HPAGE_elementLabel", "Language :");
    addElement("div", document.getElementById("HPAGE_languageContainer"), "HPAGE_languageBtnContainer", "HPAGE_elementBtnContainer");
    addElement("div", document.getElementById("HPAGE_languageBtnContainer"), "HPAGE_languageEN", "W_unselectBtn", "English");
    document.getElementById("HPAGE_languageEN").addEventListener("click", function(){ clickOnLanguageBtn(this)})
    addElement("div", document.getElementById("HPAGE_languageBtnContainer"), "HPAGE_languageFR", "W_unselectBtn", "French");
    document.getElementById("HPAGE_languageFR").addEventListener("click", function(){ clickOnLanguageBtn(this)})
    /* VERSION CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_versionContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_versionContainer"), "HPAGE_versionLabel", "HPAGE_elementLabel", "Version :");
    addElement("div", document.getElementById("HPAGE_versionContainer"), "HPAGE_versionBtnContainer", "HPAGE_elementBtnContainer");
    addElement("div", document.getElementById("HPAGE_versionBtnContainer"), "HPAGE_versionShort", "W_unselectBtn", "Short");
    document.getElementById("HPAGE_versionShort").addEventListener("click", function(){ clickOnVersionBtn(this)})
    addElement("div", document.getElementById("HPAGE_versionBtnContainer"), "HPAGE_versionLong", "W_unselectBtn", "Long");
    document.getElementById("HPAGE_versionLong").addEventListener("click", function(){ clickOnVersionBtn(this)})
    /* ERROR INFOS CONTAINER*/
    addElement("div", document.getElementById("HPAGE_mainContainer"), "HPAGE_errorContainer", "HPAGE_elementContainer");
    addElement("div", document.getElementById("HPAGE_errorContainer"), "HPAGE_errorLabel", "HPAGE_elementLabel");
    /* SUBMIT CONTAINER*/
    addElement("div", document.getElementById("HPAGE_homepage_container"), "HPAGE_submitContainer");
    addElement("div", document.getElementById("HPAGE_submitContainer"), "HPAGE_startBtn", "None", "START");
    document.getElementById("HPAGE_submitContainer").addEventListener("click", (e) => { clickOnStartBtn(this.selectedParticipantId)})
    /* ABOVE WINDOW MASKED */
    addElement("div", document.getElementById("HPAGE_homepage_container"), "aboveWindow");
    // set defaultvalues
    this.updateUiHomepage()

    function clickOnLanguageBtn(btn, choosenlanguage){
      if (btn ==  document.getElementById("HPAGE_languageEN") && document.getElementById("HPAGE_languageEN").className == 'W_unselectBtn'){
        document.getElementById("HPAGE_languageEN").className = 'W_selectBtn';
        document.getElementById("HPAGE_languageFR").className = 'W_unselectBtn';
        choosenlanguage = "EN";
      }
      else if (btn ==  document.getElementById("HPAGE_languageFR") && document.getElementById("HPAGE_languageFR").className == 'W_unselectBtn'){
        document.getElementById("HPAGE_languageFR").className = 'W_selectBtn';
        document.getElementById("HPAGE_languageEN").className = 'W_unselectBtn';
        choosenlanguage = "FR";
      }
    }
    function clickOnVersionBtn(btn, choosenversion){
      if (btn ==  document.getElementById("HPAGE_versionShort") && document.getElementById("HPAGE_versionShort").className == 'W_unselectBtn'){
        document.getElementById("HPAGE_versionShort").className = 'W_selectBtn';
        document.getElementById("HPAGE_versionLong").className = 'W_unselectBtn';
        choosenversion = "Short";
      }
      else if (btn ==  document.getElementById("HPAGE_versionLong") && document.getElementById("HPAGE_versionLong").className == 'W_unselectBtn'){
        document.getElementById("HPAGE_versionLong").className = 'W_selectBtn';
        document.getElementById("HPAGE_versionShort").className = 'W_unselectBtn';
        choosenversion = "Long";
      }
    }
    function clickOnStartBtn(participantIdValue){
      //Check Datas
      if(participantIdValue == undefined || participantIdValue.replace(/\s/g,'') == ""){
        document.getElementById("HPAGE_errorLabel").innerHTML = "* You need to determine a Participant Id"
      }
      else{
        choosenparticipantid = participantIdValue;
        if(choosenversion == "None"){
          choosenversion = defaultversion
        }
        if(choosenlanguage == "None"){
          choosenlanguage = defaultlanguage
        }
        if(choosenlanguage == "FR"){
          _selectedLangageContent = _FRcontent;
          _selectedOrdersContent = _FRorder;
        }
        else{
          _selectedLangageContent = _ENcontent;
          _selectedOrdersContent = _ENorder;
        }
        if(choosenexperiment == "None"){
          criterias = defaultCriterias;
        }
        else{
          //criterias = arch[] HERE YOU NEED TO REVIEW THE ARCH WITH PARTICIPANT AND CRITERIA OF THE EXPERIMENT
        }
        loadNewTest(choosenversion);
      }
    }
  }

  buildUI_info(){
    this.AW_openWindow();
    homepageId = "INFO";
  }

  buildUI_settings(){
    // OPEN ABOVE WINDOW
    this.AW_openWindow();
    homepageId = "SETTINGS";
    // Directory CONTAINER
    addElement("div", document.getElementById("AW_content"), "S_directoryContainer", "W_submodule");
      // Directory TITLE
    addElement("div", document.getElementById("S_directoryContainer"), "S_directory_titleContainer");
    addElement("div", document.getElementById("S_directory_titleContainer"), "S_directoryTitle", "W_titleLabel", "Choose directory");
    addElement("div", document.getElementById("S_directory_titleContainer"), "S_directorySepaLine", "W_sepaline");
      // Directory CONTENT
    addElement("div", document.getElementById("S_directoryContainer"), "S_directoryContentContainer");
    addElement("div", document.getElementById("S_directoryContentContainer"), "S_directoryName", "W_elementLabel", "Path :");
    addElement("div", document.getElementById("S_directoryContentContainer"), "S_directoryValue", "W_elementLabel", resultpath);
    addElement("div", document.getElementById("S_directoryContentContainer"), "S_directoryBtn", "None", "...");
    document.getElementById("S_directoryBtn").addEventListener("click", function(){ _QtC_openFolderFinder(document.getElementById("S_directoryValue")) })
    addElement("div", document.getElementById("S_directoryContainer"), "S_directoryerror");
    // DEFAULTS Settings (DS) CONTAINER
    addElement("div", document.getElementById("AW_content"), "S_DSContainer", "W_submodule");
      // DS title
    addElement("div", document.getElementById("S_DSContainer"), "S_DS_titleContainer");
    addElement("div", document.getElementById("S_DS_titleContainer"), "S_DSTitle", "W_titleLabel", "Default settings");
    addElement("div", document.getElementById("S_DS_titleContainer"), "S_DSSepaLine", "W_sepaline");
      // DS content
    addElement("div", document.getElementById("S_DSContainer"), "S_DSContentContainer");
        // langage
    addElement("div", document.getElementById("S_DSContentContainer"), "S_DSContentlangageContainer", "W_elementContainer");
    addElement("div", document.getElementById("S_DSContentlangageContainer"), "S_DSlangageName", "W_elementLabel", "Langage :");
    addElement("div", document.getElementById("S_DSContentlangageContainer"), "S_DSlangageBtnContainer", "S_DS_btnContainer");
    addElement("div", document.getElementById("S_DSlangageBtnContainer"), "S_DS_languageEN", "None", "English");
    document.getElementById("S_DS_languageEN").addEventListener("click", function(){ clickOnLanguageBtn(this)})
    addElement("div", document.getElementById("S_DSlangageBtnContainer"), "S_DS_languageFR", "None", "French");
    document.getElementById("S_DS_languageFR").addEventListener("click", function(){ clickOnLanguageBtn(this)})
    if (defaultlanguage == "EN"){
      document.getElementById("S_DS_languageEN").className = 'W_selectBtn';
      document.getElementById("S_DS_languageFR").className = 'W_unselectBtn';
    }
    else{
      document.getElementById("S_DS_languageFR").className = 'W_selectBtn';
      document.getElementById("S_DS_languageEN").className = 'W_unselectBtn';
    }
      // version
    addElement("div", document.getElementById("S_DSContentContainer"), "S_DSContentversionContainer", "W_elementContainer");
    addElement("div", document.getElementById("S_DSContentversionContainer"), "S_DSversionName", "W_elementLabel", "Version :");
    addElement("div", document.getElementById("S_DSContentversionContainer"), "S_DSversionBtnContainer", "S_DS_btnContainer");
    addElement("div", document.getElementById("S_DSversionBtnContainer"), "S_DS_versionShort", "None", "Short");
    document.getElementById("S_DS_versionShort").addEventListener("click", function(){ clickOnVersionBtn(this)})
    addElement("div", document.getElementById("S_DSversionBtnContainer"), "S_DS_versionLong", "None", "Long");
    document.getElementById("S_DS_versionLong").addEventListener("click", function(){ clickOnVersionBtn(this)})
    if (defaultversion == "Short"){
      document.getElementById("S_DS_versionShort").className = 'W_selectBtn';
      document.getElementById("S_DS_versionLong").className = 'W_unselectBtn';
    }
    else{
      document.getElementById("S_DS_versionLong").className = 'W_selectBtn';
      document.getElementById("S_DS_versionShort").className = 'W_unselectBtn';
    }
    // CRITERIA BOX
    addElement("div", document.getElementById("S_DSContentContainer"), "S_DSContentcriteriaContainer", "W_elementContainer");
    addElement("div", document.getElementById("S_DSContentcriteriaContainer"), "S_DS_selectCriterias", "W_elementLabel", "Selected criterias : ");
    this.buildCriteriasBox(document.getElementById("S_DSContentContainer"));

    function clickOnLanguageBtn(btn){
      if (btn ==  document.getElementById("S_DS_languageEN") && document.getElementById("S_DS_languageEN").className == 'W_unselectBtn'){
        document.getElementById("S_DS_languageEN").className = 'W_selectBtn';
        document.getElementById("S_DS_languageFR").className = 'W_unselectBtn';
        defaultlanguage = "EN";
        choosenlanguage = JSON.parse(JSON.stringify(defaultlanguage));
      }
      else if (btn ==  document.getElementById("S_DS_languageFR") && document.getElementById("S_DS_languageFR").className == 'W_unselectBtn'){
        document.getElementById("S_DS_languageFR").className = 'W_selectBtn';
        document.getElementById("S_DS_languageEN").className = 'W_unselectBtn';
        defaultlanguage = "FR";
        choosenlanguage = JSON.parse(JSON.stringify(defaultlanguage));
      }
    }
    function clickOnVersionBtn(btn){
      if (btn ==  document.getElementById("S_DS_versionShort") && document.getElementById("S_DS_versionShort").className == 'W_unselectBtn'){
        document.getElementById("S_DS_versionShort").className = 'W_selectBtn';
        document.getElementById("S_DS_versionLong").className = 'W_unselectBtn';
        defaultversion = "Short";
        choosenversion = JSON.parse(JSON.stringify(defaultversion));
      }
      else if (btn ==  document.getElementById("S_DS_versionLong") && document.getElementById("S_DS_versionLong").className == 'W_unselectBtn'){
        document.getElementById("S_DS_versionLong").className = 'W_selectBtn';
        document.getElementById("S_DS_versionShort").className = 'W_unselectBtn';
        defaultversion = "Long";
        choosenversion = JSON.parse(JSON.stringify(defaultversion));
      }
    }
  }

  buildUI_profilManager(){
    homepageId = "PROFILE_MANAGER";
    // PROFILES MANAGER
    addElement("div", document.getElementById("AW_content"), "PM_profileManagerContainer", "W_submodule");
    addElement("div", document.getElementById("PM_profileManagerContainer"), "PM_profileManager_titleContainer");
    addElement("div", document.getElementById("PM_profileManager_titleContainer"), "PM_profileManagerTitle", "W_titleLabel", "Profile manager");
    addElement("div", document.getElementById("PM_profileManager_titleContainer"), "PM_profileManagerTitle", "W_sepaline");
    addElement("div", document.getElementById("PM_profileManagerContainer"), "PM_profileManagerList");
    // Si la liste d'expe n'est pas vide
    if (Object.keys(archProfiles).length > 0){
      // affichage des expe
      for (let i=0; i<Object.keys(archProfiles).length; i++){
        addElement("div", document.getElementById("PM_profileManagerList"), "PM_profileManagerItemContainer_"+i, "PM_profileManagerItemContainer_");
        addElement("img", document.getElementById("PM_profileManagerItemContainer_"+i), "PM_profileManager_trashIcons_"+i, "PM_profileManager_trashIcons_", "None", iconAdd);
        addElement("div", document.getElementById("PM_profileManagerItemContainer_"+i), "PM_profileManager_NameExpe_"+i, "PM_profileManager_NameExpe_", Object.keys(archProfiles)[i]);
      }
    }
    // si la liste d'expe est vide
    else{
      addElement("div", document.getElementById("PM_profileManagerList"), "PM_profileManager_EmptyList", "None", "List of experiment is empty");
      addElement("div", document.getElementById("PM_profileManagerList"), "PM_createBtn", "W_createProfilBtn", "CREATE");
      document.getElementById("PM_createBtn").addEventListener("click", evt => this.cp_loadFromAw(evt))
    }
  }
  pm_loadfromHome(){
    // OPEN ABOVE WINDOW
    this.AW_openWindow();
    this.buildUI_profilManager()
  }
  pm_loadfromAw(){
    document.getElementById("AW_content").innerHTML = "";
    this.buildUI_profilManager();
  }

  buildUI_createProfile(){
    // VARIABLE
    var listofgroup = []
    var counterGroupName = 1;
    homepageId = "CREATE_PROFILE";
    // CONTAINER
    addElement("div", document.getElementById("AW_content"), "EP_createProfileContainer", "W_submodule");
    // TITLE
    addElement("div", document.getElementById("EP_createProfileContainer"), "EP_createProfile_titleContainer");
    addElement("div", document.getElementById("EP_createProfile_titleContainer"), "EP_createProfileTitle", "W_titleLabel", "Add new profile");
    addElement("div", document.getElementById("EP_createProfile_titleContainer"), "EP_createProfileSepaLine", "W_sepaline");
    // CONTENT CONTAINER
    addElement("div", document.getElementById("EP_createProfileContainer"), "EP_ContentContainer");
      // NAME
    addElement("div", document.getElementById("EP_ContentContainer"), "EP_createProfile_ExpeContainer", "W_elementContainer");
    addElement("div", document.getElementById("EP_createProfile_ExpeContainer"), "EP_ExpeName", "W_elementLabel", "Name :");
    addElement("input", document.getElementById("EP_createProfile_ExpeContainer"), "EP_ExpeNameInput");
      // GROUPS
    addElement("div", document.getElementById("EP_ContentContainer"), "EP_createProfile_GroupContainer", "W_elementContainer");
    addElement("div", document.getElementById("EP_createProfile_GroupContainer"), "EP_addGroup", "W_elementLabel", "Number of experimentals groups : "+listofgroup.length);
    addElement("div", document.getElementById("EP_createProfile_GroupContainer"), "EP_addGroupBtn", "None", "+ Add");
    document.getElementById("EP_createProfile_GroupContainer").addEventListener("click", evt => addGroup(evt))
    addElement("div", document.getElementById("EP_ContentContainer"), "EP_createProfile_GroupContent", "EP_GroupContentGhost EP_GroupContent");
      // CRITERIAS
    addElement("div", document.getElementById("EP_ContentContainer"), "EP_createProfile_CriteriaContainer", "W_elementContainer");
    addElement("div", document.getElementById("EP_createProfile_CriteriaContainer"), "EP_selectCriterias", "W_elementLabel", "Selected criterias : ");
    this.buildCriteriasBox(document.getElementById("EP_ContentContainer"));
    // CREATE
    addElement("div", document.getElementById("EP_createProfileContainer"), "EP_createBtn", "W_createProfilBtn", "CREATE");
    document.getElementById("EP_createBtn").addEventListener("click", function(){ clickOnCreate() });
    // Error display
    addElement("div", document.getElementById("EP_createProfileContainer"), "EP_displayError", "W_elementLabel", "");

    // Function d'ajout d'un group au container :: arg name(str)("None" by default) = nom du groupe si il s'agit d'ajouter un groupe existant
    function addGroup(name){
      // if arg = event ft call by btn add
      if (typeof name != "string"){
        name = "None";
      }
      // Id du groupe
      var groupId;
      var indexGroupId;
      // Si aucun groupe n'existe
      if (listofgroup.length == 0){
        // Ajout de la classe W_elementContainer à la div EP_createProfile_GroupContent
        document.getElementById("EP_createProfile_GroupContent").classList.remove("EP_GroupContentGhost");
        document.getElementById("EP_createProfile_GroupContent").classList.add("W_elementContainer");
      }
      // Si le nom de groupe n'est pas défini
      if (name == "None"){
        // define group id
        groupId = "group"+(counterGroupName);
        // add 1 to counterGroupName pour évité les doublon de nom
        counterGroupName ++;
        // add empty group to the list
        listofgroup.push(groupId);
        // index in the list
        indexGroupId = listofgroup.length-1;
      }
      // Si le nom de groupe est défini
      else{
        groupId = name;
        indexGroupId = listofgroup.indexOf(name);
      }
      // UI
      addElement("div", document.getElementById("EP_createProfile_GroupContent"), "EP_Group"+indexGroupId, "EP_Group");
      addElement("div", document.getElementById("EP_Group"+indexGroupId), "EP_GroupNumber"+indexGroupId, "EP_GroupNumber", "Group "+(indexGroupId+1)+" :");
      addElement("input", document.getElementById("EP_Group"+indexGroupId), "EP_GroupName"+indexGroupId, "EP_GroupName", groupId);
      if(name != "None"){
        document.getElementById("EP_GroupName"+indexGroupId).value = groupId;
      }
      addElement("img", document.getElementById("EP_Group"+indexGroupId), "EP_GroupTrash"+indexGroupId, "EP_GroupTrash");
      // click bouton suppression du groupe
      document.getElementById("EP_GroupTrash"+indexGroupId).addEventListener("click", function() {
        // suppression du groupe de la liste des groupes
        listofgroup.splice(indexGroupId, 1);
        // Suppression de l'ensemble du contenue du container group
        document.getElementById("EP_createProfile_GroupContent").innerHTML = "";
        // Réatribution de la class d'origine au container
        document.getElementById("EP_createProfile_GroupContent").classList.remove("W_elementContainer");
        document.getElementById("EP_createProfile_GroupContent").classList.add("EP_GroupContentGhost");
        // Réaffichage des groupe restant dans le container
        refreshGroup();
      });
      // MAJ du nom de groupe dans listofgroup
      document.getElementById("EP_GroupName"+indexGroupId).addEventListener("change", function() {
        listofgroup[indexGroupId] = document.getElementById("EP_GroupName"+indexGroupId).value;
      });
      // refresh counter
      document.getElementById("EP_addGroup").innerHTML = "Number of experimentals groups : "+listofgroup.length;
    }
    // Affichage de tout les groupe dans le container suite à suppression d'un groupe (et donc suppression de l'ensemble du contenu du container group)
    function refreshGroup(){
      // Si aucun groupe n'existe
      if(listofgroup.length == 0){
        // MAJ du counter
        document.getElementById("EP_addGroup").innerHTML = "Number of experimentals groups : "+listofgroup.length;
      }
      // Si au moin 1 groupe existe
      else{
        // boucle de parcour des groupes
        for (let i=0; i<listofgroup.length; i++){
          // Ajout du groupe au container
          addGroup(listofgroup[i]);
        }
      }
    }
    // When click on btn create
    function clickOnCreate(){
      // if the name is only full of blank space
      if (document.getElementById("EP_ExpeNameInput").value.replace(/\s/g, '') == ""){
        document.getElementById("EP_displayError").innerHTML = "* The name of the experiment is not valid"
      }
      // if no criteria is selected
      else if(bufferCheckedCriteriasBox.length == 0){
        document.getElementById("EP_displayError").innerHTML = "* Select at least one criterium"
      }
      else{
        var validgroup = true;
        // Loop for checked no groups have blankspace for the name
        for(var i=0; i<listofgroup.length; i++){
          if (listofgroup[i].replace(/\s/g, '') == ""){
            document.getElementById("EP_displayError").innerHTML = "* The name of the one or more of the experimental groups is not valid";
            validgroup = false;
          }
        }
        // if all condition is respected : send datas to python
        if (validgroup){
          _QtC_createNewProfile({"name":document.getElementById("EP_ExpeNameInput").value, "groups":listofgroup, "criteria":bufferCheckedCriteriasBox})
          /*
          if (createProfileError["error"] == 1){
            document.getElementById("EP_displayError").innerHTML = createProfileError["errortype"];
          }
          else{
            console.log("changepage")
          }
          */
        }
      }
    }
  }
  cp_loadfromHome(){
    this.AW_openWindow();
    this.buildUI_createProfile();
  }
  cp_loadFromAw(){
    document.getElementById("AW_content").innerHTML = "";
    this.buildUI_createProfile();
  }

  /******************************************************* ADDITIONAL MODULE */

  AW_openWindow(){
    document.getElementById("aboveWindow").style.maxWidth = "600px";
    document.getElementById("aboveWindow").style.opacity = "1";
    addElement("div", document.getElementById("aboveWindow"), "AW_header");
    addElement("img", document.getElementById("AW_header"), "AW_closeBtn", "None", "None", iconAdd);
    document.getElementById("AW_closeBtn").addEventListener("click", (e) => {clickOnReturnBtn(this.AW_closeWindow, this.updateUiHomepage)});
    addElement("div", document.getElementById("aboveWindow"), "AW_content");
    document.getElementById("AW_content").style.opacity = "1";

    function clickOnReturnBtn(AW_closeWindow, updateUiHomepage){
      // Si la page settings est affiché
      if (homepageId == "SETTINGS"){
        // MAJ des donnée critère par defaut
        defaultCriterias = [];
        for(let i=0; i<bufferCheckedCriteriasBox.length; i++){
          defaultCriterias.push(bufferCheckedCriteriasBox[i])
        }
        // enregistrement des donnée par defaut
        _QtC_setDefaultValues()
      }
      AW_closeWindow(updateUiHomepage);
    }
  }
  AW_closeWindow(updateUiHomepage){
    document.getElementById("aboveWindow").style.maxWidth = "0px";
    document.getElementById("aboveWindow").innerHTML = '';
    document.getElementById("aboveWindow").style.opacity = "0";
    homepageId = "HOME";
    updateUiHomepage()
  }

  buildCriteriasBox(parent){
    // CONTAINER
    addElement("div", parent, "CM_selectCriteriasContainer");
    // ALL
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_AllContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_AllContainer"), "CM_Criteria_AllBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_AllBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_AllContainer"), "CM_Criteria_AllBtn", "W_criteriaChoice", "All");
    // MENTAL
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_MentalContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_MentalContainer"), "CM_Criteria_MentalBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_MentalBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    // exemple // document.getElementById("CM_Criteria_MentalBtnCheckbox").addEventListener( 'change', (e) => {checkboxIsChecked(document.getElementById("CM_Criteria_MentalBtnCheckbox"), bufferCheckedCriteriasBox)});
    addElement("div", document.getElementById("CM_Criteria_MentalContainer"), "CM_Criteria_MentalBtn", "W_criteriaChoice", "Mental Demand");
    // PHYSICAL
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_PhysicalContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_PhysicalContainer"), "CM_Criteria_PhysicalBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_PhysicalBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_PhysicalContainer"), "CM_Criteria_PhysicalBtn", "W_criteriaChoice", "Physical Demand");
    // TEMPORAL
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_TemporalContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_TemporalContainer"), "CM_Criteria_TemporalBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_TemporalBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_TemporalContainer"), "CM_Criteria_TemporalBtn", "W_criteriaChoice", "Temporal Demand");
    // PERFORMANCE
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_PerformanceContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_PerformanceContainer"), "CM_Criteria_PerformanceBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_PerformanceBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_PerformanceContainer"), "CM_Criteria_PerformanceBtn", "W_criteriaChoice", "Performance");
    // EFFORT
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_EffortContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_EffortContainer"), "CM_Criteria_EffortBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_EffortBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_EffortContainer"), "CM_Criteria_EffortBtn", "W_criteriaChoice", "Effort");
    // FRUSTRATION
    addElement("div", document.getElementById("CM_selectCriteriasContainer"), "CM_Criteria_FrustrationContainer", "W_criteriaContainer");
    addElement("input", document.getElementById("CM_Criteria_FrustrationContainer"), "CM_Criteria_FrustrationBtnCheckbox", "W_criteriaCheckbox", "None", "checkbox");
    document.getElementById("CM_Criteria_FrustrationBtnCheckbox").addEventListener( 'change', function(){checkboxIsChecked(this)});
    addElement("div", document.getElementById("CM_Criteria_FrustrationContainer"), "CM_Criteria_FrustrationBtn", "W_criteriaChoice", "Frustration");
    // INIT
    initBufferListCriteria()
    setCheckboxValue()

    // Maj de la liste buffercriteria
    function initBufferListCriteria(){
      bufferCheckedCriteriasBox = [];
      for(let i=0;i<defaultCriterias.length;i++){
        bufferCheckedCriteriasBox.push(defaultCriterias[i])
      }
    }
    // active ou desactive les checkbox en fonction de la bufferlist
    function setCheckboxValue(){
      // Si tous les critère sont coché
      if (defaultCriterias.length == 6){
        // boucle d'une liste de cette collection
        for (let i=0; i<Array.prototype.slice.call(document.getElementsByClassName('W_criteriaChoice')).length; i++){
          // Pour chaque élément de la liste, appliqué un style de couleur blanche
          Array.prototype.slice.call(document.getElementsByClassName('W_criteriaChoice'))[i].style.color = "white";
        }
        // boucle d'une liste de cette collection
        for (let i=0; i<Array.prototype.slice.call(document.getElementsByClassName('W_criteriaCheckbox')).length; i++){
          // pour chaque élément de la liste activer la checkbox
          Array.prototype.slice.call(document.getElementsByClassName('W_criteriaCheckbox'))[i].checked = true;
        }
      }
      // Si au moins un critère est décoché
      else{
        document.getElementById("CM_Criteria_MentalBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_PhysicalBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_TemporalBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_PerformanceBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_EffortBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_FrustrationBtnCheckbox").checked = false;
        for(let i=0;i<defaultCriterias.length;i++){
          switch (defaultCriterias[i]) {
            case 'Mental':
              document.getElementById("CM_Criteria_MentalBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_MentalBtn").style.color = "white";
              break;
            case 'Physical':
              document.getElementById("CM_Criteria_PhysicalBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_PhysicalBtn").style.color = "white";
              break;
            case 'Temporal':
              document.getElementById("CM_Criteria_TemporalBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_TemporalBtn").style.color = "white";
              break;
            case 'Performance':
              document.getElementById("CM_Criteria_PerformanceBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_PerformanceBtn").style.color = "white";
              break;
            case 'Effort':
              document.getElementById("CM_Criteria_EffortBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_EffortBtn").style.color = "white";
              break;
            case 'Frustration':
              document.getElementById("CM_Criteria_FrustrationBtnCheckbox").checked = true;
              document.getElementById("CM_Criteria_FrustrationBtn").style.color = "white";
              break;
          }
        }
      }
    }
    // Ft de gestion des click sur les checkbox
    function checkboxIsChecked(checkbox){
      // si la checkbox est activé
      if(checkbox.checked) {
        // BTN ALL
        if(checkbox == document.getElementById("CM_Criteria_AllBtnCheckbox")){
          // La liste de critère sélectionné correpond à la liste de tous les critère
          bufferCheckedCriteriasBox = [];
          for (let i=0; i<tlxCriteria.length; i++){
            bufferCheckedCriteriasBox.push(tlxCriteria[i])
          }
          // boucle d'une liste de cette collection
          for (let i=0; i<Array.prototype.slice.call(document.getElementsByClassName('W_criteriaChoice')).length; i++){
            // Pour chaque élément de la liste, appliqué un style de couleur blanche
            Array.prototype.slice.call(document.getElementsByClassName('W_criteriaChoice'))[i].style.color = "white";
          }
          // boucle d'une liste de cette collection
          for (let i=0; i<Array.prototype.slice.call(document.getElementsByClassName('W_criteriaCheckbox')).length; i++){
            // pour chaque élément de la liste activer la checkbox
            Array.prototype.slice.call(document.getElementsByClassName('W_criteriaCheckbox'))[i].checked = true;
          }
        }
        // OTHER BTN
        else{
          // boucle de parcours de la liste des nom de critère
          for (let i=0; i<tlxCriteria.length; i++){
            // Si id de la checkbox inclue le nom de critère
            if (checkbox.id.includes(tlxCriteria[i])){
              // ajout du critère à la liste de selection
              bufferCheckedCriteriasBox.push(tlxCriteria[i]);
              // tri de la liste
              bufferCheckedCriteriasBox = sortBufferList(bufferCheckedCriteriasBox);
              // highlight name
              document.getElementById(checkbox.id.replace('Checkbox', '')).style.color = "white";
              // Fin de parcour de la liste
              i = tlxCriteria.length;
            }
          }
        }
      }
      // Si la checkbox est désactivé
      else {
        // Si n'importe quel élément est décoché : checkbox all est décoché et grisé par defaut
        document.getElementById("CM_Criteria_AllBtnCheckbox").checked = false;
        document.getElementById("CM_Criteria_AllBtn").style.color = "#B5B5B5";
        //
        if (checkbox != document.getElementById("CM_Criteria_AllBtnCheckbox")){
          // boucle de parcours de la liste des nom de critère
          for (let i=0; i<tlxCriteria.length; i++){
            // Si id de la checkbox inclue le nom de critère
            if (checkbox.id.includes(tlxCriteria[i])){
              // suppression du critère à la liste de selection
              const index = bufferCheckedCriteriasBox.indexOf(tlxCriteria[i]);
              if (index > -1) {
                bufferCheckedCriteriasBox.splice(index, 1);
              }
              // supress highlight
              document.getElementById(checkbox.id.replace('Checkbox', '')).style.color = "#B5B5B5";
              // Fin de parcour de la liste
              i = tlxCriteria.length;
            }
          }
        }
      }
    }
    // Ft to sort the list in the right pattern even is all element is not there
    function sortBufferList(bufferlist){
      var sbl_defaultList = ["Mental", "Physical", "Temporal", "Performance", "Effort", "Frustration"];
      var newBufferList = [];
      for (var i=0; i<sbl_defaultList.length; i++){
        for (var i2=0; i2<bufferlist.length; i2++){
          if(sbl_defaultList[i] == bufferlist[i2]){
            newBufferList.push(sbl_defaultList[i])
            i2 = bufferlist.length;
          }
        }
      }
      return newBufferList
    }
  }

  buildListingPage(type){
    var valuesOfTheList = getValuesToSetInList(type);
    if (valuesOfTheList.length == 0){
      console.log("empty")
    }
    else{
      // WINDOW
      document.getElementById("aboveWindow").style.maxWidth = "600px";
      document.getElementById("aboveWindow").style.opacity = "1";
      addElement("div", document.getElementById("aboveWindow"), "AW_LIST_content");
      document.getElementById("AW_LIST_content").style.opacity = "1";
      addElement("div", document.getElementById("AW_LIST_content"), "AW_LIST_mylist")
      // CHOICE NO SELECTION
      if(type != "group"){
        addElement("div", document.getElementById("AW_LIST_mylist"), "AW_LIST_mylistElementContainerDefault", "AW_LIST_mylistElementContainer")
        addElement("div", document.getElementById("AW_LIST_mylistElementContainerDefault"), "AW_LIST_mylistElementNameDefault", "AW_LIST_mylistElementName", "Default Expe")
        document.getElementById("AW_LIST_mylistElementNameDefault").addEventListener("click", function(){ clickOnValue(this, type) })
        if(type == "expe" && choosenexperiment == "None"){
          addElement("img", document.getElementById("AW_LIST_mylistElementContainerDefault"), "AW_LIST_mylistElementIconDefault", "AW_LIST_mylistElementIcon")
          document.getElementById("AW_LIST_mylistElementNameDefault").style.color = "#2D6E96"
        }
        else if(type == "id" && choosenparticipantid == "None"){
          addElement("img", document.getElementById("AW_LIST_mylistElementContainerDefault"), "AW_LIST_mylistElementIconDefault", "AW_LIST_mylistElementIcon")
          document.getElementById("AW_LIST_mylistElementNameDefault").style.color = "#2D6E96"
        }
      }
      // SET LIST DATAS
      for(var i=0; i<valuesOfTheList.length; i++){
        addElement("div", document.getElementById("AW_LIST_mylist"), "AW_LIST_mylistElementContainer"+i, "AW_LIST_mylistElementContainer")
        addElement("div", document.getElementById("AW_LIST_mylistElementContainer"+i), "AW_LIST_mylistElementName"+i, "AW_LIST_mylistElementName", valuesOfTheList[i])
        document.getElementById("AW_LIST_mylistElementName"+i).addEventListener("click", function(){ clickOnValue(this, type, valuesOfTheList) })
        if(type == "expe" && valuesOfTheList[i] == choosenexperiment){
          addElement("img", document.getElementById("AW_LIST_mylistElementContainer"+i), "AW_LIST_mylistElementIcon"+i, "AW_LIST_mylistElementIcon")
          document.getElementById("AW_LIST_mylistElementName"+i).style.color = "#2D6E96"
        }
        else if(type == "group" && valuesOfTheList[i] == choosengroup){
          addElement("img", document.getElementById("AW_LIST_mylistElementContainer"+i), "AW_LIST_mylistElementIcon"+i, "AW_LIST_mylistElementIcon")
          document.getElementById("AW_LIST_mylistElementName"+i).style.color = "#2D6E96"
        }
        else if(type == "id" && valuesOfTheList[i] == choosenparticipantid){
          addElement("img", document.getElementById("AW_LIST_mylistElementContainer"+i), "AW_LIST_mylistElementIcon"+i, "AW_LIST_mylistElementIcon")
          document.getElementById("AW_LIST_mylistElementName"+i).style.color = "#2D6E96"
        }
      }
    }

    function getValuesToSetInList(type){
      if (type == "expe"){
        return Object.keys(archProfiles)
      }
      else if(type == "group" && choosenexperiment != "None"){
        return Object.keys(archProfiles[choosenexperiment])
      }
      else if (type == "id" && choosenexperiment != "None" && choosengroup != "None"){
        return Object.keys(archProfiles[choosenexperiment][choosengroup])
      }
      else{
        return []
      }
    }
    function clickOnValue(uiElementClicked, type, listOfElement="None"){
      // Find value to set
      var valueFromClick = uiElementClicked.id.replace("AW_LIST_mylistElementName", "");
      if(valueFromClick != "Default"){
        valueFromClick = listOfElement[valueFromClick]
      }
      else{
        valueFromClick = "None"
      }
      // set external value
      if(type == "expe" && valueFromClick != choosenexperiment){
        // set expe
        choosenexperiment = valueFromClick;
        document.getElementById("HPAGE_expChoice").innerHTML = getTransformedChoosenHomeValue(type, choosenexperiment)
        // reset group
        if(valueFromClick != "None"){
          var listgroups = Object.keys(archProfiles[choosenexperiment])
          if(listgroups.length > 0){
            choosengroup = listgroups[0]
          }
          else{
            choosengroup = "None"
          }
        }
        else{
          choosengroup = "None"
        }
        document.getElementById("HPAGE_groupElement").innerHTML = getTransformedChoosenHomeValue("group", choosengroup)
        // reset id
        choosenparticipantid = "None";
        document.getElementById("HPAGE_IdElement").value = getTransformedChoosenHomeValue("id", choosenparticipantid)
      }
      else if(type == "group" && valueFromClick != choosengroup){
        // set group
        choosengroup = valueFromClick;
        document.getElementById("HPAGE_groupElement").innerHTML = getTransformedChoosenHomeValue(type, choosengroup);
        // reset id
        choosenparticipantid = "None";
        document.getElementById("HPAGE_IdElement").value = getTransformedChoosenHomeValue("id", choosenparticipantid)
      }
      else if (type == "id"){
        choosenparticipantid = valueFromClick;
        document.getElementById("HPAGE_IdElement").value = getTransformedChoosenHomeValue(type, choosenparticipantid)
      }
      // close window
      document.getElementById("aboveWindow").style.maxWidth = "0px";
      document.getElementById("aboveWindow").innerHTML = '';
      document.getElementById("aboveWindow").style.opacity = "0";
    }
  }

}





/******************************************************************************* APP.VIEW.RULES */

class TlxRules{

  /* Class de construction de l'affichage graphique d'une règle avec curseur pour la saisie des donnée de l'interface
  *
  *     > constructor (rulename) ------------------------------------------------- constructeur de la class || args :: rulename = nom du critère NTLX issue de tlx.js > var criterias
  *     > buildRules(parentObject) ----------------------------------------------- Création des éléments HTML constitutif de la règle curseur enfant de "parentObject"
  *
  */

  constructor(rulename){
    this.rulename = rulename;
  }
  buildRules(parentObject){
    var rulesID = this.rulename;
    // Build container
    addElement("div", parentObject, "tlxRules_container_"+rulesID, "tlxRules_container_");
    var tlxRules_container_ = document.getElementById("tlxRules_container_"+rulesID);
    // Build socle
    addElement("div", tlxRules_container_, "tlxRules_baseGridline_"+rulesID, "tlxRules_baseGridline_");
    // Build bar1
    addElement("div", tlxRules_container_, "tlxRules_Gridline1_"+rulesID, "tlxRules_Gridline1_ tlxRules_lightGridline_");
    // Build bar2
    addElement("div", tlxRules_container_, "tlxRules_Gridline2_"+rulesID, "tlxRules_Gridline2_ tlxRules_lightGridline_");
    // Build bar3
    addElement("div", tlxRules_container_, "tlxRules_Gridline3_"+rulesID, "tlxRules_Gridline3_ tlxRules_lightGridline_");
    // Build bar4
    addElement("div", tlxRules_container_, "tlxRules_Gridline4_"+rulesID, "tlxRules_Gridline4_ tlxRules_lightGridline_");
    // Build bar5
    addElement("div", tlxRules_container_, "tlxRules_Gridline5_"+rulesID, "tlxRules_Gridline5_ tlxRules_lightGridline_");
    // Build bar6
    addElement("div", tlxRules_container_, "tlxRules_Gridline6_"+rulesID, "tlxRules_Gridline6_ tlxRules_lightGridline_");
    // Build bar7
    addElement("div", tlxRules_container_, "tlxRules_Gridline7_"+rulesID, "tlxRules_Gridline7_ tlxRules_lightGridline_");
    // Build bar8
    addElement("div", tlxRules_container_, "tlxRules_Gridline8_"+rulesID, "tlxRules_Gridline8_ tlxRules_lightGridline_");
    // Build bar9
    addElement("div", tlxRules_container_, "tlxRules_Gridline9_"+rulesID, "tlxRules_Gridline9_ tlxRules_lightGridline_");
    // Build bar10
    addElement("div", tlxRules_container_, "tlxRules_Gridline10_"+rulesID, "tlxRules_Gridline10_ tlxRules_lightGridline_");
    // Build bar11
    addElement("div", tlxRules_container_, "tlxRules_Gridline11_"+rulesID, "tlxRules_Gridline11_ tlxRules_strongGridline_");
    // Build bar12
    addElement("div", tlxRules_container_, "tlxRules_Gridline12_"+rulesID, "tlxRules_Gridline12_ tlxRules_lightGridline_");
    // Build bar13
    addElement("div", tlxRules_container_, "tlxRules_Gridline13_"+rulesID, "tlxRules_Gridline13_ tlxRules_lightGridline_");
    // Build bar14
    addElement("div", tlxRules_container_, "tlxRules_Gridline14_"+rulesID, "tlxRules_Gridline14_ tlxRules_lightGridline_");
    // Build bar15
    addElement("div", tlxRules_container_, "tlxRules_Gridline15_"+rulesID, "tlxRules_Gridline15_ tlxRules_lightGridline_");
    // Build bar16
    addElement("div", tlxRules_container_, "tlxRules_Gridline16_"+rulesID, "tlxRules_Gridline16_ tlxRules_lightGridline_");
    // Build bar17
    addElement("div", tlxRules_container_, "tlxRules_Gridline17_"+rulesID, "tlxRules_Gridline17_ tlxRules_lightGridline_");
    // Build bar18
    addElement("div", tlxRules_container_, "tlxRules_Gridline18_"+rulesID, "tlxRules_Gridline18_ tlxRules_lightGridline_");
    // Build bar19
    addElement("div", tlxRules_container_, "tlxRules_Gridline19_"+rulesID, "tlxRules_Gridline19_ tlxRules_lightGridline_");
    // Build bar20
    addElement("div", tlxRules_container_, "tlxRules_Gridline20_"+rulesID, "tlxRules_Gridline20_ tlxRules_lightGridline_");
    // Build bar21
    addElement("div", tlxRules_container_, "tlxRules_Gridline21_"+rulesID, "tlxRules_Gridline21_ tlxRules_lightGridline_");
    // Build range slider
    tlxRules_container_.addEventListener("click", function(event){
      /// Calculate position
      var mouseposOnclick = event.clientX;
      var posDiv = findAbsolutePos(tlxRules_container_)
      var sizeDiv = tlxRules_container_.offsetWidth;
      var cursorStartPosition = Math.round(((parseInt(mouseposOnclick)-parseInt(posDiv))*100)/parseInt(sizeDiv));
      // Création du curseur si inexistant
      if (scores[rulesID] == "None"){
        // Create cursor
        addSliderCursor(tlxRules_container_, rulesID, cursorStartPosition, "tlxRules_slider_"+rulesID, "tlxRules_slider_")
      }
      else{
        // MAJ de la position si existant
        document.getElementById("tlxRules_slider_"+rulesID+"_line_").style.left = cursorStartPosition+"%";
      }
      // MAJ score
      scores[rulesID] = cursorStartPosition;
      console.log(scores)
    });
  }

}

function buildRuleElement(parent, criteria, content, rules){
  // Build container
  addElement("div", parent, "rulesElement_container_"+criteria, "rulesElement_container_");
  // Build title
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_title_"+criteria, "rulesElement_title_", content[criteria]["title"]);
  // Build content
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_content_"+criteria, "rulesElement_content_", content[criteria]["content"]);
  // Build rules
  rules[criteria].buildRules(document.getElementById("rulesElement_container_"+criteria));
  // Build container max/min scale
  addElement("div", document.getElementById("rulesElement_container_"+criteria), "rulesElement_scaleContainer_"+criteria, "rulesElement_scaleContainer_");
  // Build min
  addElement("div", document.getElementById("rulesElement_scaleContainer_"+criteria), "rulesElement_min_"+criteria, "rulesElement_min_", content[criteria]["scaleMin"]);
  // Build max
  addElement("div", document.getElementById("rulesElement_scaleContainer_"+criteria), "rulesElement_max_"+criteria, "rulesElement_max_", content[criteria]["scaleMax"]);
}
function onClickValidRulesPage(){
  // check if all the values is ok
  valid = checkRulesValidity();
  // if it's ok
  if (valid.length == 0){
    // vide le container principal
    parent.innerHTML = "";
    // return result to run next page
    return true;
  }
  // if all is not ok
  else{
    // pour chaque critère non renseigné
    for (criteria in valid){
      document.getElementById("rulesElement_title_"+valid[criteria]).style.color = "red";
      document.getElementById("rulesElement_content_"+valid[criteria]).style.color = "red";
    }
    // ajout d'une note explicative
    document.getElementById("adviceElement_additionalNote_").innerHTML = _selectedOrdersContent["additionalNote"];
    // remonte l'overflow en haut de page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // return result
    return false;
  }
}



/******************************************************************************* APP.VIEW.WEIGHT */

// Fill the two criterias' container and allow to fill the selectedCriteria with a click on the element
function buildWeightModule(parent, pairs, content){
  // Create UI element
  addElement("div", parent, "weightChoice_element1_"+pairs[0], "weightChoice_element1_ weightChoice_element", content[0]);
  addElement("div", parent, "weightChoice_sepaline");
  addElement("div", parent, "weightChoice_element2_"+pairs[1], "weightChoice_element2_ weightChoice_element", content[1]);
  // select element on click
  document.getElementById("weightChoice_element1_"+pairs[0]).addEventListener("click", function(){
    // si l'élément n'était pas sélectioné
    if (selectedCriteria != pairs[0]){
      // MAJ du critère sélectionné
      selectedCriteria = pairs[0];
      // MAJ UI
      document.getElementById("weightChoice_element1_"+pairs[0]).style.color = "blue";
      document.getElementById("weightChoice_element2_"+pairs[1]).style.color = "black";
    }
  });
  document.getElementById("weightChoice_element2_"+pairs[1]).addEventListener("click", function(){
    // si l'élément n'était pas sélectioné
    if (selectedCriteria != pairs[1]){
      // MAJ du critère sélectionné
      selectedCriteria = pairs[1];
      // MAJ UI
      document.getElementById("weightChoice_element1_"+pairs[0]).style.color = "black";
      document.getElementById("weightChoice_element2_"+pairs[1]).style.color = "blue";
    }
  });
}



/******************************************************************************* TOOLS */
// faire en class
function addElement(type, parent, id="None", divClass="None", content="None", additional="None"){
  if (type == "img"){
    myElement = BUILD_IMAGE(id, divClass, additional)
  }
  else if (type == "input"){
    myElement = BUILD_INPUT(id, divClass, content, additional)
  }
  else{
    myElement = BUILD_ELEMENT(type, id, divClass, content);
  }
  parent.appendChild(myElement);
}

function BUILD_ELEMENT (type, id="None", divClass="None", content="None", image="None"){
  // crée un nouvel élément div
  var myDiv = document.createElement(type);
  // assignation de l'id
  if (id != "None"){
    myDiv.id = id;
  }
  // assignation de la class
  if (divClass != "None"){
    myDiv.className = divClass;
  }
  // assignation de l'image
  if (image != "None"){
    myDiv.src = image;
  }
  // assignation du contenu
  if (content != "None"){
    var newContent = document.createTextNode(content);
    myDiv.appendChild(newContent);
  }
  return myDiv;
}
function BUILD_IMAGE(id="None", divClass="None", image="None"){
  var img = document.createElement('img');
  if (id != "None"){
    img.id = id;
  }
  if (divClass != "None"){
    img.className = divClass;
  }
  img.src =  image;
  return img;
}
function BUILD_INPUT(id="None", divClass="None", content="None", additional="None"){
  // crée un nouvel élément div
  var myDiv = document.createElement("input");
  // assignation de l'id
  if (id != "None"){
    myDiv.id = id;
  }
  // assignation de la class
  if (divClass != "None"){
    myDiv.className = divClass;
  }
  // assignation du contenu
  if (content != "None"){
    myDiv.placeholder = content;
  }
  if (additional == "checkbox"){
    myDiv.setAttribute("type", "checkbox");
  }
  return myDiv;
}

function addSliderCursor(parent, criteria, cursorStartPosition, id="None", divClass="None"){
  /* BUILD_SLIDERCURSOR() ---> Création du curseur du slider
  *
  *   > UI
  *   > Variables
  *   > Event
  *   > Functions
  *     >> timer()
  *     >> pressingDown(event)
  *     >> notPressingDown(event)
  *
  */

  ////////////////////////////////////////////////////////////////////////////// UI

  // Ajout du témoin indiquant la position du curseur
  var sliderline = document.createElement("div");
  parent.appendChild(sliderline);
  // crée le curseur (invisible et large de 14px pour faciliter l'UX
  var slidercursor = document.createElement("div");
  // Ajout du curseur à la div parent
  sliderline.appendChild(slidercursor);
  // assignation de l'id
  slidercursor.id = id;
  sliderline.id = id+"_line_"
  // assignation de la class
  slidercursor.className = divClass;
  sliderline.className = divClass+"line_"
  // set startposition
  sliderline.style.left = cursorStartPosition+"%";
  // Set parent additional caracteristic
  parent.style.cursor = "pointer";


  ////////////////////////////////////////////////////////////////////////////// Variables

  // position de la div "parent" par rapport à la fenêtre
  let absolutePos = findAbsolutePos(parent);
  // Déclaration de la variable de réactualisation à 60fps
  let timerID;
  // Déclaration du compteur de frame
  let counter = 0;
  // Déclaration du temps d'attente (en ms) avant de considérer le click comme "hold"
  let pressHoldDuration = 10;
  // Déclaration de la variable de position du curseur (en %) dans son parent
  let relativePosCursor;

  ////////////////////////////////////////////////////////////////////////////// Event

  // Détection du click right mouse sur le curseur
  slidercursor.addEventListener("mousedown", pressingDown, false);
  // Détection du déclick right mouse dans l'ensemble de la fenêtre
  document.body.addEventListener("mouseup", notPressingDown, false);

  ////////////////////////////////////////////////////////////////////////////// Functions

  // function de détection du hold
  function timer() {
    // set 60 fps listener
    timerID = requestAnimationFrame(timer);
    // Si le hold est encore inférieur à 20ms
    if (counter < pressHoldDuration) {
      counter++;
    }
    // Si le hold est validé
    else {
      //slidercursor.style.left = relativePosCursor+"%";
      sliderline.style.left = relativePosCursor+"%";
      // MAJ scores
      scores[criteria] = Math.round(relativePosCursor)
      console.log(scores)
      //console.log(scores)
    }
  }
  // function de détection du click
  function pressingDown(e) {
    // Start the timer
    requestAnimationFrame(timer);
    // Détection du mouvement de la souris --
    document.body.addEventListener("mousemove",function(e){
      // position de la souris dans la fenêtre
      var mousePos = e.x;
      // position du curseur en px par rapport au parent
      var posX = parseInt(mousePos)-parseInt(absolutePos);
      // position du curseur en % par rapport au parent
      var relativePosX = (posX*100)/parseInt(parent.offsetWidth);
      // Set value du curseur en % avec max et min
      if (relativePosX<=0){
        relativePosCursor = 0;
      }
      else if (relativePosX >= 100){
        relativePosCursor = 100;
      }
      else{
        relativePosCursor = relativePosX;
      }
    });
  }
  // function de détection du déclick
  function notPressingDown(e) {
    // Stop the timer
    cancelAnimationFrame(timerID);
    counter = 0;
  }

}

//Retourne la position absolue d'un objet
function findAbsolutePos(obj){
  var curleft = 0;
  if (obj.offsetParent) {
    curleft = obj.offsetLeft
      while (obj = obj.offsetParent) {
        curleft += obj.offsetLeft;
      }
    }
  return curleft;
}
