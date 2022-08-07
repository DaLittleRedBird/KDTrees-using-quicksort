// Returns the k-th smallest element of list within left..right inclusive (i.e. left <= k <= right).
function quickselect(array, hi, low, k) {
    let pivotIndex;
    while (low < hi) {
        pivotIndex = getpivot(array, hi, low);
        pivotIndex = partition(array, hi, low, pivotIndex, [false, k]);
        if (pivotIndex == k) { return k; }
        if (pivotIndex > k) { right = pivotIndex - 1; } else { left = pivotIndex + 1; }
    }
    return low;
}

/*
The axis variable tells the algorithm how it should sort the array :
0 - 1 dimensional array that uses objects without (x, y, z) coordinates.
1 - x-axis.
2 - y-axis.
3 - z-axis.
*/
function getpivot(array, hi, low, axis) {
    if (hi - low < 5) { return medianAtmost5(array, hi, low); }
    let i, subRight, mid, median5, temp;
    for (i = low; i < hi; i += 5) {
        subRight = i + 4;
        if (subRight > hi) { subRight = hi; }
        median5 = medianAtmost5(list, i, subRight);
        temp = array[median5];
        array[median5] = array[low + Math.floor((i − low)/5)];
        array[low + Math.floor((i − low)/5)] = temp;
    }
    mid = Math.floor((hi − low) / 10) + low + 1;
    return quickselect(array, low, low + Math.floor((hi − low) / 5), mid);
}

function partition(array, hi, low, pivotIdx, quickalgPair) {
    let pivotValue = array[pivotIdx], temp, j, storeIndex, storeIndexEq;
    // Move pivot to end
    array[pivotIdx] = array[hi];
    array[hi] = pivotValue;
    storeIndex = low;
    // Move all elements smaller than the pivot to the left of the pivot
    for (j = low; j < hi; j++) {
        if (array[j] < pivotValue) {
            temp = array[storeIndex];
            array[storeIndex] = array[j];
            array[j] = temp;
            storeIndex++;
        }
    }
    // Move all elements equal to the pivot right after the smaller elements
    storeIndexEq = storeIndex;
    for (j = storeIndex; j < hi; j++) {
        if (array[j] == pivotValue) {
            temp = array[storeIndex];
            array[storeIndex] = array[j];
            array[j] = temp;
            storeIndexEq++;
        }
    }
    // Move the pivot to where it belongs
    temp = array[storeIndexEq];
    array[storeIndexEq] = array[j];
    array[j] = temp;
    //Is this quicksort? If so, return the bouns of the partition
    if (quickalgPair[0]) { return [storeIndex, storeIndexEq]; }
    // If not, return location of pivot considering the desired location quickalgPair[1]
    if (quickalgPair[1] < storeIndex) {return storeIndex;}  // quickalgPair[1] is in the group of smaller elements
    if (quickalgPair[1] <= storeIndexEq) {return quickalgPair[1];}  // quickalgPair[1] is in the group equal to pivot
    return storeIndexEq; // quickalgPair[1] is in the group of larger elements
}

//Done using a (mergesort) decision tree
function medianAtmost5(array, hi, low) {
    let Max2lowest, Min2lowest, Max2highest, Min2highest;
    switch (hi - low) {
        case 5:
        /*
        InOrder1 = array[low + 1] >= array[low];
        Max2lowest = (InOrder1 ? low + 1 : low);
        Min2lowest = (InOrder1 ? low : low + 1);
        InOrder2 = array[hi] >= array[hi - 1];
        Max2highest = (InOrder2 ? hi : hi - 1);
        Min2highest = (InOrder2 ? hi - 1 : hi);
        return InOrder1 ? InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                        : InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi);
        */
        return InOrder1 ? InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                        : InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi);
        case 4:
        /*
        InOrder1 = array[low + 1] >= array[low];
        Max2lowest = (InOrder1 ? low + 1 : low);
        Min2lowest = (InOrder1 ? low : low + 1);
        InOrder2 = array[hi] >= array[hi - 1];
        Max2highest = (InOrder2 ? hi : hi - 1);
        Min2highest = (InOrder2 ? hi - 1 : hi);
        return InOrder1 ? InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                        : InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi);
        */
        return InOrder1 ? InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                        : InOrder2 ? Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                   : Min2lowest >= Min2highest ? (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi)
                                                               : (Max2lowest >= Min2highest ? Max2lowest >= Max2highest ? low : hi : Max2lowest >= Max2highest ? low : hi);
        /*
        InOrder = array[low + 1] >= array[low];
        Max2lowest = (InOrder ? low + 1 : low);
        Min2lowest = (InOrder ? low : low + 1);
        return array[hi] >= Max2lowest ? Max2lowest : (array[hi] >= Min2lowest ? hi : Min2lowest);
        */
        case 3: const InOrder = array[low + 1] >= array[low]; Max2lowest = (InOrder ? low : low + 1); Min2lowest = (InOrder ? low + 1 : low); return array[hi] >= Max2lowest ? Max2lowest : (array[hi] >= Min2lowest ? hi : Min2lowest);
        case 2: return array[hi] >= array[low] ? low : hi;
        default: return low;
    }
}

function quicksort(array, hi, low) {
    if (low >= hi || low < 0) {return;}
    // Sort point list and choose median as pivot element
    let medianIndex = getpivot(array, hi, low, 0), node = new kdNode();
    let quickpartition = partition(array, hi, low, medianIndex, [true]), left = quickpartition[0], right = quickpartition[1];
    quicksort(array, low, quickpartition - 1);
    quicksort(array, quickpartition + 1, hi);
}

function kdnode(pointLst, hi, low) {
    this.xView = x; this.yView = y; this.wView = w; this.hView = h;
    this.left = null; this.right = null; this.shape = null;
    this.intersects = function(rect) { return this.xView + this.wView >= rect.x && rect.x + rect.w >= this.xView && this.yView + this.hView >= rect.y && rect.y + rect.h >= this.yView; }
    this.query = function(range, found) {
        if (!found) {found = [];}
        ;
    }
}

//A 3d k-d tree constructor
function constructkdtree(pointLst, hi, low, axis) {
    if (low >= hi || low < 0) {return;}
    // Sort point list and choose median as pivot element
    let medianIndex = getpivot(pointLst, hi, low, axis), node = new kdNode();
    let quickpartition = partition(pointLst, hi, low, medianIndex, [true]), left = quickpartition[0], right = quickpartition[1];
    // Create node and construct subtree
    node.shape = pointLst[medianIndex];
    node.left = kdtree(pointLst, low, left - 1, (axis + 1) % 3 + 1);
    node.right = kdtree(pointLst, right + 1, hi, (axis + 1) % 3 + 1);
    return node;
}

var points = [{x : 10, y : 20, z : 3}, {x : -50, y : 35, z : -7}, {x : -24, y : 57, z : 20}, {x : -15, y : 8, z : 17}], kdtree1 = constructkdtree(points, points.length, 0, 1);
