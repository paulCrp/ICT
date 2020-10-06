###############################################################################
#     import
###############################################################################

import os
import csv


###############################################################################
#    FT
###############################################################################

def CREA_BDD (destination, list_args): #destination = repertoire du fichier // list_args = list des argument composant la BDD
        #FT qui permet la création de la database //
        #pour utilisation facile de la class bdd destination doit être le nom de la bdd
        # il est indispensable de définir ces 2 variable avant d'initialisé la création d'une bdd
        a = csv.writer(open (destination, 'w'), dialect='unix',delimiter = ';')
        a.writerow(list_args)


###############################################################################
#    Bdd
###############################################################################

class Bdd:
    """ MODULE DEFFINISSANT LA CREATION ET LA LECTURE DES BDD // l'indentation commence a 1 (0etant les arg)
    >
    > Bdd.db() ------------------------------------------- BDD en liste de liste :: format [[], []]
    > Bdd.addentry(entry) -------------------------------- Nouvelle entrée :: entry >> list [] trier dans le même ordre que les args
    > Bdd.addentries(entries) ---------------------------- Nouvelles entrées :: entries >> list de list [[], []] ou chaques sont trier dans le m^me ordre que les args
    > Bdd.searchone (arg, element, return_args) ------------- "arg", "element", [return_args] :: return []
    > Bdd.row(arg, element) ------------------------------ renvoie la ligne en entier en list[]
    > Bdd.delentry(row) ---------------------------------- supprime l'entrée de la ligne indiqué
    > Bdd.modifentry (row, return_arg, value) ------------ Modifie la case selectionner par la valeur "value"
    > Bdd.modifsentry (row, [return_args], [values]) ---- Modifie les case selectionner par les valeurs "values" (les liste doivent être coordonnées)
    > Bdd.count (arg, element) --------------------------- compte le nb d'élément recherché dans la colone concerné
    > bdd.findall (arg) ---------------------------------- Renvoie une liste de tte la colone selectionné
    > Bdd.searchall (arg, element, return_args) ---------- search avec return tout les element [[]]
    >
    """

    # idée d'amélioration = # création de table multiple (avec multiple header (ex: list args = [infoE, infoPR ...] infoE = [CAP, VM3M ...])
                            # amélioration FT SEARCH avec recherche multiple (plusieurs éléments dans plusieurs args)


    def __init__(self, bdd): # bdd = nom de la bdd qui doit être en réalité la destination du .csv
        self.file_name = bdd
        self.fichier = open(self.file_name, 'r')
        self.list_args = self.fichier.readline().replace("\"", "").replace("\n", "").split(";")
        self.fichier.close()

    def db(self):
        with open (self.file_name, 'r') as f:
            a = csv.reader(f, dialect='unix',delimiter = ';')
            bdd_data = []
            for row in a:
                bdd_data.append(row)
        return bdd_data

    def addentry (self, entry): # entry est une liste trier par dans le mm rdre que args
        with open (self.file_name, 'a') as f:
            a = csv.writer (f, dialect='unix',delimiter = ';')
            a.writerow(entry)

    def addentries (self, entries):
        with open (self.file_name, 'a') as f:
            x=0
            while x<len(entries):
                a = csv.writer (f, dialect='unix',delimiter = ';')
                entry = entries[x]
                a.writerow(entry)
                x+=1

    def searchone(self, arg, element, return_args):
        #ouverture & lecture de la db
        with open (self.file_name, 'r') as f:
            a = open(self.file_name, 'r')
            b = a.readlines()

            #position et verif de l'arg ds db
            pos_arg = self.list_args.index(arg)
            #boucle initialisant le retour des arg associé // créa de la list avec leurs position
            i = 0
            pos_return_args = []
            while i<len(return_args):
                j = return_args[i]
                pos_args = self.list_args.index(j)
                pos_return_args.append(pos_args)
                i+=1
            #initialisation du resultat sous forme d'une liste de liste (sert renvoyer plusieur résulat si nécessaire)
            resultat = []
            #boucle qui parcour la db a la recherche de l'élément
            x = 0
            while x < len(b):
                d = b[x].replace("\"", "").replace("\n", "").split(";")
                e = d[pos_arg]
                if element == e:
                    k = 0
                    res = []
                    while k < len(pos_return_args):
                        g = pos_return_args[k]
                        l = d[g]
                        res.append(l)
                        k+=1
                    resultat.append(res)
                x+=1
            #self.fichier.close()
        return resultat[0]
    
    
    def searchall(self, arg, element, return_args):
        #ouverture & lecture de la db
        with open (self.file_name, 'r') as f:
            a = open(self.file_name, 'r')
            b = a.readlines()

            #position et verif de l'arg ds db
            pos_arg = self.list_args.index(arg)
            #boucle initialisant le retour des arg associé // créa de la list avec leurs position
            i = 0
            pos_return_args = []
            while i<len(return_args):
                j = return_args[i]
                pos_args = self.list_args.index(j)
                pos_return_args.append(pos_args)
                i+=1
            #initialisation du resultat sous forme d'une liste de liste (sert renvoyer plusieur résulat si nécessaire)
            resultat = []
            #boucle qui parcour la db a la recherche de l'élément
            x = 0
            while x < len(b):
                d = b[x].replace("\"", "").replace("\n", "").split(";")
                e = d[pos_arg]
                if element == e:
                    k = 0
                    res = []
                    while k < len(pos_return_args):
                        g = pos_return_args[k]
                        l = d[g]
                        res.append(l)
                        k+=1
                    resultat.append(res)
                x+=1
            #self.fichier.close()
        return resultat

    def row (self, arg, element):
        all_arg = self.list_args
        a = self.searchone(arg, element, all_arg)
        return a

    def delentry (self, row):
        ide = self.ID(row)
        if ide != 0:
            db = self.db()
            del db[ide]
        self.DB_WRITE(db)

    def modifentry(self, row, return_arg, value):
        ide = self.ID(row)
        if ide != 0:
            colone = self.list_args.index(return_arg)
            db = self.db()
            row = db[ide]
            row[colone] = value
            self.DB_WRITE(db)
    
    def modifsentry(self, row, return_args, values):
        ide = self.ID(row)
        if ide != 0:
            x=0
            while x<len(return_args):
                colone = self.list_args.index(return_args[x])
                db = self.db()
                row = db[ide]
                row[colone] = values[x]
                self.DB_WRITE(db)
                x+=1
            

    def count (self, arg, element): #args definit le secteur de recherche // elements = list d'éléments a rechercher classé par args
        with open (self.file_name, 'r') as f:
            #ouverture & lecture de la db
            a = open(self.file_name, 'r')
            b = a.readlines()
            #position et verif de l'arg ds db
            pos_arg = self.list_args.index(arg)
            #initialisation du resultat
            resultat = 0
            #boucle qui parcour la db a la recherche de l'élément
            x = 0
            while x < len(b):
                d = b[x].replace("\"", "").replace("\n", "").split(";")
                e = d[pos_arg]
                if element == e:
                    resultat += 1
                x+=1
            self.fichier.close()
            return resultat

    def findall (self, arg):
        with open (self.file_name, 'r') as f:
            #ouverture & lecture de la db
            a = open(self.file_name, 'r')
            b = a.readlines()
            #position et verif de l'arg ds db
            pos_arg = self.list_args.index(arg)
            resultat = []
            x = 1
            while x < len(b):
                d = b[x].replace("\"", "").replace("\n", "").split(";")
                e = d[pos_arg]
                resultat.append(e)
                x+=1
            return resultat


#####    FT

    def ID (self, row): #renvoie liste[ligne, colone]
        x=0
        db = self.db()
        y = 0
        while x<len(db):
            a = str(db[x])
            b = str(row)
            if b == a:
                y += x
                x +=999
            x+=1
        return y

    def DB_WRITE (self, db):
        with open ("temp_file.csv", 'w') as f:
            c = csv.writer (f, dialect='unix',delimiter = ';')
            x=0
            while x<len(db):
                c.writerow(db[x])
                x+=1
        os.remove (self.file_name)
        os.rename("temp_file.csv", self.file_name)

    def VIEW_ARGS (self):
        print (*self.list_args)


###############################################################################
#     Test
###############################################################################



if __name__ == "__main__":

    #créa de la bdd
    list_arg_bddtest = ["firmcode", "lp", "CAP"]
    name = "bddtest1"
    filename = "..\\BDD\\%s.csv"%name
    CREA_BDD (filename, list_arg_bddtest)

    #lecture & ecriture dans la bdd
    bdd = Bdd(filename)

    args = ["CPST", 5.5, 120]
    bdd.addentry (args)
    args1 = ["LUNA", 1.25, 80]
    args2 = ["LUNA", 0.6, 77]
    bdd.addentries ([args1, args2])
    
    s = bdd.searchall("firmcode", "LUNA", ["lp", "CAP"])
    
    r= bdd.row("lp", "0.6")
    bdd.delentry(r)

    a = bdd.search("firmcode", "LUNA", ["lp", "CAP"])

    tot = bdd.findall("firmcode")

    r= bdd.row("firmcode", "LUNA")
    i = bdd.ID(r)


    m = bdd.modifentry(r, "firmcode", "ONCY")

    b = bdd.db()
    print (b)
    #recherche ds la bdd
    h = bdd.count("lp", "80")

    print (s)
