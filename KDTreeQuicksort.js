function swap(array, a, b) { const temp = array[a]; array[a] = array[b]; array[b] = temp; }

// Returns the k-th smallest element of list within left...right inclusive (i.e. left <= k <= right).
function quickselect(array, hi, low, k) { return array[partitionselect(array, hi, low, k)]; }

function partitionselect(array, hi, low, k) {
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
        median5 = medianAtmost5(array, subRight, i, 0);
        swap(array, median5, low + Math.floor((i - low)/5));
    }
    mid = Math.floor((hi - low) / 10) + low + 1;
    return partitionselect(array, low, low + Math.floor((hi - low) / 5), mid);
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
	let i, j, inOrder, Max2lowest, Min2lowest;
	for (i = low + 1; i <= hi; i++) {
		inOrder = axis == 0 ? array[i - 1] > array[i] : axis == 1 ? array[i - 1].shape.x > array[i].shape.x : axis == 2 ? array[i - 1].shape.y > array[i].shape.y : array[i - 1].shape.z > array[i].shape.z;
        for (j = i; j > low && inOrder; j--) {
			swap(array, j - 1, j);
			inOrder = axis == 0 ? array[j - 1] > array[j] : axis == 1 ? array[j - 1].shape.x > array[j].shape.x : axis == 2 ? array[j - 1].shape.y > array[j].shape.y : array[j - 1].shape.z > array[j].shape.z;
        }
    }
	return Math.floor((hi + low) / 2);
    /*switch (hi - low) {
        case 4:
        / *
        4 elems : (low <= low + 1) -> (hi - 1 <= hi) -> (min(low, low + 1) <= min(hi - 1, hi)) -> (max(low, low + 1) <= max(hi - 1, hi)) -> (min(max(low, low + 1), max(hi - 1, hi)) <= max(min(low, low + 1), min(hi - 1, hi))) ~ (min(max(a, b), max(c, d)) <= max(min(a, b), min(c, d)))
        
        a b c d

        abcd/11111 or acdb/1110x or acbd/11110 or cabd/1101x or cadb/11001 or cdab/11000 or
        adbc/10110 or adcb/1010z or abdc/10111 or dabc/1001z or dcab/10000 or dacb/10001 or
        bacd/01111 or bcda/0110y or bcad/01110 or cbad/0101y or cdba/01000 or cbda/01001 or
        bdac/00110 or bdca/0010w or badc/00111 or dbac/0001w or dbca/00001 or dcba/00000
        
        inOrder = array[low + 1] >= array[low]; Max2lowest = (inOrder ? low + 1 : low); Min2lowest = (inOrder ? low : low + 1);
        const alsoInOrder = array[hi] >= array[hi - 1], Max2highest = (alsoInOrder ? hi : hi - 1), Min2highest = (alsoInOrder ? hi - 1 : hi), alsoAlsoInOrder = Math.min(Max2lowest, Max2highest) <= Math.max(Min2lowest, Min2highest);
        
        return inOrder ? alsoInOrder ? Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
							                                     : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
			                         : Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
							                                     : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
	                   : alsoInOrder ? Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
							         : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
			                                                     : Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
							         : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
        * /
        return inOrder ? alsoInOrder ? Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
                                                                 : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
                                     : Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
                                                                 : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
	                   : alsoInOrder ? Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
							         : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
                                                                 : Min2lowest >= Min2highest ? Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
                                     : Max2lowest >= Min2highest ? (Max2lowest >= Max2highest ? : ) : (Max2lowest >= Max2highest ? : )
        
        
        case 3: inOrder = array[low + 1] >= array[low]; Max2lowest = (inOrder ? low : low + 1), Min2lowest = (inOrder ? low + 1 : low);
        return array[hi] >= Max2lowest ? Max2lowest : (array[hi] >= Min2lowest ? hi : Min2lowest);
        case 2: return array[hi] >= array[low] ? low : hi;
        default: return low;
    }*/
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

function getdist(point) { return point.x * point.x + point.y * point.y + point.z * point.z; }

//A Somewhat unfinished 3d k-d tree constructor
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

//Unfinished
function search(tree, point, pointLst, depth, nearestNghbor) {
    if (!tree) { return nearestNeighbor; }
    let best = nearestNghbor, bestDist = getdist(nearestNghbor), curDist = getdist(point), axis = (depth % 3) + 1, diff, close, away;
    
    if (!best || curDist < bestDist) { best = point; }
    
	diff = (axis == 1) ? point.x - tree.shape.x : (axis == 2) ? point.y - tree.shape.y : point.z - tree.shape.z;
	close = diff <= 0 ? tree.left : tree.right; away = diff <= 0 ? tree.right : tree.left;
	
    best = search(close, close.shape, pointLst, depth + 1, best);
    if (diff * diff < best.distance) { best = search(away, away.shape, pointLst, depth + 1, best); }
    return best;
}

function findNearestNeighbor(point, pointLst) { const tree = constructKDtree(points, points.length, 0, 1); return search(tree, tree.shape, pointLst, 1, null); }

var points = [{x : 10, y : 20, z : 3}, {x : -50, y : 35, z : -7}, {x : -24, y : 57, z : 20}, {x : -15, y : 8, z : 17}, {x : 9, y : 9, z : 9}], kdtree1 = constructKDtree(points, points.length, 0, 1);
