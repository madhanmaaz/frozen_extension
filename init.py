import os

def realPath(filname):
    return f"{os.getcwd()}\\{filname}"

def command(command):
    os.system(command)


html = f"""
<h1>Copy this path</h1>
<h2>{realPath("")}</h2>
<h3>
go to extension page and enable developer mode. 
click unpacked and select the location.  
</h3>
"""

with open(realPath("readme.html"), 'w') as vbsFile:
    vbsFile.write(html)

os.startfile(realPath("readme.html"))
print("DONE.")