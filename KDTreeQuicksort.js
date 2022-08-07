function quickselect(array, hi, low, n) {
    let pivotIndex;
    while (low < hi) {
        pivotIndex = getpivot(array, hi, low);
        pivotIndex = partition(array, hi, low, n);
        if (pivotIndex == n) {
            return n;
        } else if (pivotIndex > n) {
            right = pivotIndex - 1;
        } else { left = pivotIndex + 1; }
    }
    return low;
}

function getpivot(array, hi, low) {
    if (hi - low < 5) { return medianAtmost5(array, hi, low); }
    let i, subRight, mid, median5, temp;
    for (i = low; i < hi; i += 5) {
        subRight = i + 4;
        if (subRight > hi) { subRight = hi; }
        median7 = medianAtmost5(list, i, subRight);
        
        temp = array[median5];
        array[median5] = array[low + Math.floor((i − low)/5)];
        array[low + Math.floor((i − low)/5)] = temp;
    }
    mid = Math.floor((hi − low) / 10) + low + 1;
    return quickselect(array, low, low + Math.floor((hi − low) / 5), mid);
}

function partition(array, hi, low, n) {
    ;
}

//Done using a (mergesort) decision tree
function medianAtmost5(array, hi, low) {
    switch (hi - low) {
        case 5:
        if (array[low + 1] >= array[low]) {
            ;
        } else {
            ;
        }
        // return array[hi] >= array[low] ? (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi)) : (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi));
        break;
        case 4:
        if (array[low + 1] >= array[low]) {
            if (array[low + 2] >= array[low + 1]) {
                ;
            } else {
                ;
            }
        } else {
            if (array[low + 2] >= array[low + 1]) {
                ;
            } else {
                ;
            }
        }
        //return array[hi] >= array[low] ? (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi)) : (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi));
        break;
        case 3: return array[hi] >= array[low] ? (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi)) : (array[low + 1] >= array[low] ? (array[hi] >= array[low + 1] ? low : hi) : (array[hi] >= array[low + 1] ? low : hi));
        case 2: return array[hi] >= array[low] ? low : hi;
        default: return low;
    }
}

function quicksort(array, hi, low) {
    if (low >= hi || low < 0) {return;}
    // Sort point list and choose median as pivot element
    let medianIndex = partition(shapeLst, hi, low, Math.floor((hi + low) / 2)), node = new kdNode();
    quicksort(shapeLst, low, medianIndex - 1);
    quicksort(shapeLst, medianIndex + 1, hi);
}

function kdnode(pointLst, hi, low, axis) {
    this.xView = x; this.yView = y; this.wView = w; this.hView = h;
    this.left = null; this.right = null; this.shape = null;
    this.intersects = function(rect) { return this.xView + this.wView >= rect.x && rect.x + rect.w >= this.xView && this.yView + this.hView >= rect.y && rect.y + rect.h >= this.yView; }
    this.query = function(range, found) {
        if (!found) {found = [];}
        ;
    }
}

function constructkdtree(pointLst, hi, low, axis) {
    if (low >= hi || low < 0) {return;}
    // Sort point list and choose median as pivot element
    let medianIndex = partition(shapeLst, hi, low), node = new kdNode();
    // Create node and construct subtree
    node.shape = shapeLst[medianIndex];
    node.left = kdtree(shapeLst, low, medianIndex - 1);
    node.right = kdtree(shapeLst, medianIndex + 1, hi);
    return node;
}
