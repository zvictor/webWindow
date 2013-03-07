#! /usr/bin/python
# -*- coding: utf-8 -*-
import re
import subprocess
from shutil import copytree, rmtree
from os import listdir
from os import path
from os import remove

class Builder:
	source = ".."
	dest = "../build"
	level = "SIMPLE_OPTIMIZATIONS" # SIMPLE_OPTIMIZATIONS, WHITESPACE_ONLY, ADVANCED_OPTIMIZATIONS

	def build(self):
		if path.exists(self.dest):
			rmtree(self.dest)
		copytree(self.source, self.dest)
		compiled = []
		for file in self.listFiles("html"):
			print file
			compiled += self.buildFile(file)
		for js in set(compiled):
			remove(path.join(self.dest, js))
			
	def buildFile(self, fileName):
		file = path.join(self.dest, fileName)
		content = open(file, 'r').read()
		pattern = re.compile(r'[\s]*<script language="JavaScript" src="([^"]*)"></script>[\s]*<!--[\s]*CompileIt![\s]*-->')
		match = pattern.findall(content)
		open(file, 'w').write( re.sub("</head>", '<script language="JavaScript" src="'+fileName+'.js"></script>\n</head>', pattern.sub("", content)) )

		if not match:
			return []
		args = []
		for js in match:
			args.append("--js="+path.join(self.dest, js))
		args.append("--js_output_file="+file+".js")
		args.append("--compilation_level="+self.level)
		print args
		subprocess.check_call(["java", "-jar", "compiler.jar"] +args)
		return match
		
	def listFiles(self, extension=False):
		list = listdir(self.dest)
		list = filter(lambda filePath:path.isfile(path.join(self.dest, filePath)), list)
		if extension:
			list = filter(lambda fileName:fileName.split(".")[-1] == extension, list)
		return list

if __name__ == "__main__":
	Builder().build()
