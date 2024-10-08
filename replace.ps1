foreach( $file in (ls public/*.css) ){
    node replace "$file"
}