# LangCore

## THIS IS V2

This version is a little better because it unifies packages from LCC/LCM to LCP (LangCore Package [Syntax]) and includes an empty starter project.  

Some things have been changed as well in the [package syntax system.](YourLang/lcp_packages/0.syntaxpkg)

technically a js substitution "framework"

## what is this

this project takes all the good parts of the (now defunct) WiLYSoft: HARD "engine", and merges it into a more extensible and readable format

## how to use WSH2 (WiLYSoft: HARD 2: Electric WiLY)

LCM exists to show you the basics of what you can do with langcore. WSH2, obtains *full feature parity between the original and langcore* (and is faster!) all while still showing you the power of langcore.

to use WSH2, simply put your scripts into the WSH2/proj folder, and run `cd WSH2 && node WSH2`. your project will be built (and ran [at runtime]) in the `WSH2/build` directory.

## how to use LCM/demo lang 1

i've created a demo "package language" for syntax rules (.synmod) in LCM/lcm_packages and a "language" (verbose english) that takes all the .synmod packages and uses that for each LangCore module for better understanding of this system

## how it works

langcore works by going through each module (in the order it was added) and checking for a keyword then replacing it if it exists

## namespaces

think of something like the `console` constant like a namespace - it has console.log, console.debug, etc.  
namespaces are a similar concept- you may have multiple functions to log, but console.log will do its specific function.

for example, your namespace may be `MyCoolLang::` and you have a declaration `AAAA` to `console.log`. this looks like

```txt
MyCoolLang::AAAA ("Hi")
```

and gets "compiled" into

```js
console.log ("Hi")
```

## macros

if you need something from another module, you can create a macro that works in the global namespace.

declaring a macro `@test` to `hi` will allow you to do

```js
console.log(@test)
```

which will turn into

```js
console.log('hi')
```

## why

yes
