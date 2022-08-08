function swap(array, a, b) { const temp = array[a]; array[a] = array[b]; array[b] = temp; }

// Returns the k-th smallest element of list within left...right inclusive (i.e. left <= k <= right).
function quickselect(array, hi, low, k) {
    let pivotIndex;
    while (low < hi) {
        pivotIndex = getpivot(array, hi, low, 0);
        pivotIndex = partition(array, hi, low, pivotIndex, 0, [false, k]);
        if (pivotIndex == k) { return k; }
        if (pivotIndex > k) { right = pivotIndex - 1; } else { left = pivotIndex + 1; }
    }
    return low;
}

function getpivot(array, hi, low) {
    if (hi - low < 5) { return medianAtmost5(array, hi, low, 0); }
    let i, subRight, mid, median5;
    for (i = low; i < hi; i += 5) {
        subRight = (i + 4 > hi) ? hi : i + 4;
        median5 = medianAtmost5(array, i, subRight, 0);
        swap(array, median5, low + Math.floor((i - low)/5));
    }
    mid = Math.floor((hi - low) / 10) + low + 1;
    return quickselect(array, low, low + Math.floor((hi - low) / 5), mid);
}

function partition(array, hi, low, pivotIdx, axis, quickalgPair) {
    let j, storeIndex, storeIndexEq, inOrder;
    // Move pivot to end
    let pivotValue = array[pivotIdx]; array[pivotIdx] = array[hi]; array[hi] = pivotValue;
    storeIndex = low;
    // Move all elements smaller than the pivot to the left of the pivot
    for (j = low; j < hi; j++) {
        inOrder = axis == 0 ? array[j] < pivotValue : axis == 1 ? array[j].shape.x < pivotValue.shape.x : axis == 2 ? array[j].shape.y < pivotValue.shape.y : array[j].shape.z < pivotValue.shape.z;
        if (inOrder) { swap(array, storeIndex, j); storeIndex++; }
    }
    // Move all elements equal to the pivot right after the smaller elements
    storeIndexEq = storeIndex;
    for (j = storeIndex; j < hi; j++) {
        inOrder = axis == 0 ? array[j] < pivotValue : axis == 1 ? array[j].shape.x < pivotValue.shape.x : axis == 2 ? array[j].shape.y < pivotValue.shape.y : array[j].shape.z < pivotValue.shape.z;
        if (inOrder) { swap(array, storeIndexEq, j); storeIndexEq++; }
    }
    // Move the pivot to where it belongs
    swap(array, storeIndexEq, hi);
    
    //Is this quicksort? If so, return the bounds of the partition
    if (quickalgPair[0]) {return [storeIndex, storeIndexEq];}
    
    // If not, return location of pivot considering the desired location quickalgPair[1]
    if (quickalgPair[1] < storeIndex) {return storeIndex;}  // quickalgPair[1] is in the group of smaller elements
    if (quickalgPair[1] <= storeIndexEq) {return quickalgPair[1];}  // quickalgPair[1] is in the group equal to pivot
    return storeIndexEq; // quickalgPair[1] is in the group of larger elements
}

function medianAtmost5(array, hi, low, axis) {
    let i, j, inOrder;
    switch (hi - low) {
        case 5: case 4:
        for (i = low + 1; i <= hi; i++) {
            inOrder = axis == 0 ? array[j - 1] > array[j] : axis == 1 ? array[j - 1].shape.x > array[j].shape.x : axis == 2 ? array[j - 1].shape.y > array[j].shape.y : array[j - 1].shape.z > array[j].shape.z;
            for (j = i; j > low && inOrder; j--) {
                swap(array, j - 1, j);
                inOrder = axis == 0 ? array[j - 1] > array[j] : axis == 1 ? array[j - 1].shape.x > array[j].shape.x : axis == 2 ? array[j - 1].shape.y > array[j].shape.y : array[j - 1].shape.z > array[j].shape.z;
            } 
        }
        return Math.floor((hi + low) / 2);
        
        case 3: inOrder = array[low + 1] >= array[low];
        const Max2lowest = (inOrder ? low : low + 1), Min2lowest = (inOrder ? low + 1 : low);
        return array[hi] >= Max2lowest ? Max2lowest : (array[hi] >= Min2lowest ? hi : Min2lowest);
        
        case 2: return array[hi] >= array[low] ? low : hi;
        default: return low;
    }
}

function quicksort(array, hi, low) {
    if (low >= hi || low < 0) {return;}
    // Sort point list and choose median as pivot element
    let medianIndex = getpivot(array, hi, low, 0);
    let quickpartition = partition(array, hi, low, medianIndex, 0, [true]), left = quickpartition[0], right = quickpartition[1];
    quicksort(array, left - 1, low);
    quicksort(array, hi, right + 1);
}

function kdnode(shape) {
    this.xView = x; this.yView = y; this.yView = z; this.wView = l; this.wView = w; this.hView = h;
    this.left = null; this.right = null; this.shape = shape;
    this.contains = function(rect) { return this.xView + this.wView >= rect.x && rect.x + rect.w >= this.xView && this.yView + this.hView >= rect.y && rect.y + rect.h >= this.yView; }
    //Find all 'shapes' that intersect a given range
    this.query = function(range, found) {
        if (!found) { found = []; }
        if (range.intersects(this.shape)) { found.push(this.shape); }
        
        if (this.left) { this.left.query(range, found); }
        if (this.right) { this.right.query(range, found); }
        
        return found;
    }
}

//A 3d k-d tree constructor
function constructKDtree(pointLst, hi, low, axis) {
    if (low >= hi || low < 0) {return;}
    
    // Sort point list and choose median as pivot element
    let medianIndex = getpivot(pointLst, hi, low, axis), node = new kdnode(pointLst[medianIndex]);
    let quickpartition = partition(pointLst, hi, low, medianIndex, axis, [true]), left = quickpartition[0], right = quickpartition[1];
    
    // Create node and construct subtree
    node.shape = pointLst[medianIndex];
    node.left = constructKDtree(pointLst, left - 1, low, (axis + 1) % 3 + 1);
    node.right = constructKDtree(pointLst, hi, right + 1, (axis + 1) % 3 + 1);
    return node;
}

function getdist(point) { return point.x * point.x + point.y * point.y + point.z * point.z; }

//Unfinished
function search(tree, point, pointLst, depth, nearestNghbor) {
    let best = nearestNghbor, bestDist, curDist, axis, diff, close, away;
    if (!tree) { return nearestNeighbor; }
    
    bestDist = getdist(nearestNghbor); curDist = getdist(point);
    if (!best || curDist < bestDist) { best = point; }
    
    axis = depth % 3; diff = point[axis] - tree.value[axis];
    
    if (diff <= 0) { close = tree.left; away = tree.right; } else { close = tree.right; away = tree.left; }
    best = search(close, point, pointLst, depth + 1, best);
    if (diff * diff < best.distance) { best = search(away, point, pointLst, depth + 1, best); }
    return best;
}

//Somewhat unfinished
function findNearestNeighbor(point, pointLst) {
    var tree = constructKDtree(points, points.length, 0, 1);
    const nearestNghbor = search(tree, point, pointLst, 1, null);
    return nearestNghbor;
}

var points = [{x : 10, y : 20, z : 3}, {x : -50, y : 35, z : -7}, {x : -24, y : 57, z : 20}, {x : -15, y : 8, z : 17}, {x : 9, y : 9, z : 9}], kdtree1 = constructKDtree(points, points.length, 0, 1);
