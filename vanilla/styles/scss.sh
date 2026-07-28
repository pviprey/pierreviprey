#!/bin/dash

error(){
    echo 'ERROR'
}

usage(){
    echo 'usage:\t./scss.sh SCSS_FileName'
}

if [ $# -ne 1 ];then
    error>&2
    usage>&2
    exit 10
fi

if [ ! -f "$1.scss" ];then
    error>&2
    echo "The file doesn't exists"
    exit 11
fi

sass $1.scss $1.css
clear
echo -n "Lastly updated: "
date
