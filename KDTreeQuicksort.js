function swap(array, a, b, areShapes) {
	if (areShapes) {
		const temp = { x : array[a].x, y : array[a].y, z : array[a].z };
		array[a].x = array[b].x; array[a].y = array[b].y; array[a].z = array[b].z;
		array[b].x = temp.x; array[b].y = temp.y; array[b].z = temp.z;
	} else { const temp = array[a]; array[a] = array[b]; array[b] = temp; }
}

// Returns the k-th smallest element of list within left...right inclusive (i.e. left <= k <= right).
function quickselect(array, hi, low, k, axis) { return array[partitionselect(array, hi, low, k, axis)]; }

function partitionselect(array, hi, low, k, axis) {
	let pivotIndex;
	while (low < hi) {
		pivotIndex = getpivot(array, hi, low, axis);
		pivotIndex = partition(array, hi, low, pivotIndex, axis, [false, k]);
		if (pivotIndex == k) { return k; }
		if (pivotIndex > k) { right = pivotIndex - 1; } else { left = pivotIndex + 1; }
	}
	return low;
}

function getpivot(array, hi, low, axis) {
    if (hi - low < 5) { return medianAtmost5(array, hi, low, axis); }
    let i, subRight, mid, median5;
    for (i = low; i < hi; i += 5) {
        subRight = (i + 4 > hi) ? hi : i + 4;
        median5 = medianAtmost5(array, subRight, i, 0);
        swap(array, median5, low + Math.floor((i - low)/5), axis != 0);
    }
    mid = Math.floor((hi - low) / 10) + low + 1;
    return partitionselect(array, low, low + Math.floor((hi - low) / 5), mid, axis);
}

function partition(array, hi, low, pivotIdx, axis, quickalgPair) {
	let j, storeIndex, storeIndexEq, inOrder;
	
	// Move pivot to end
	let pivotValue = array[pivotIdx];
	switch (axis) {
		case 0: array[pivotIdx] = array[hi]; array[hi] = pivotValue; break;
		case 1: swap(array, pivotIdx, hi, true); pivotValue = array[hi].x; break;
		case 2: swap(array, pivotIdx, hi, true); pivotValue = array[hi].y; break;
		case 3: swap(array, pivotIdx, hi, true); pivotValue = array[hi].z; break;
	}
	
	storeIndex = low;
	// Move all elements smaller than the pivot to the left of the pivot
	for (j = low; j < hi; j++) {
		inOrder = axis == 0 ? array[j] < pivotValue : axis == 1 ? array[j].x < pivotValue : axis == 2 ? array[j].y < pivotValue : array[j].z < pivotValue;
		if (inOrder) { swap(array, storeIndex, j, axis != 0); storeIndex++; }
	}
	// Move all elements equal to the pivot right after the smaller elements
	storeIndexEq = storeIndex;
	for (j = storeIndex; j < hi; j++) {
		inOrder = axis == 0 ? array[j] < pivotValue : axis == 1 ? array[j].x < pivotValue : axis == 2 ? array[j].y < pivotValue : array[j].z < pivotValue;
		if (inOrder) { swap(array, storeIndexEq, j, axis != 0); storeIndexEq++; }
	}
	// Move the pivot to where it belongs
	swap(array, storeIndexEq, hi, axis != 0);
    
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
		inOrder = axis == 0 ? array[i - 1] > array[i] : axis == 1 ? array[i - 1].x > array[i].x : axis == 2 ? array[i - 1].y > array[i].y : array[i - 1].z > array[i].z;
		for (j = i; j > low && inOrder; j--) {
			swap(array, j - 1, j, axis != 0);
			inOrder = axis == 0 ? array[j - 1] > array[j] : axis == 1 ? array[j - 1].x > array[j].x : axis == 2 ? array[j - 1].y > array[j].y : array[j - 1].z > array[j].z;
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

/*
The axis variable stores the axis that quicksort is sorting against.
0 - No axis, plain quicksort
1 - x-axis
2 - y-axis
3 - z-axis
*/
function quicksort(array, hi, low, axis) {
	if (low >= hi || low < 0) {return;}
	hi = hi >= pointLst.length ? pointLst.length - 1 : hi;
	// Sort point list and choose median as pivot element
	let medianIndex = getpivot(array, hi, low, axis);
	let quickpartition = partition(array, hi, low, medianIndex, axis, [true]), left = quickpartition[0], right = quickpartition[1];
	quicksort(array, left - 1, low, axis);
	quicksort(array, hi, right + 1, axis);
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

//Euclidian distance metric
function getdist(point, other) { const delX = point.x - other.x, delY = point.y - other.y, delZ = point.z - other.z; return delX * delX + delY * delY + delZ * delZ; }

//A 3d k-d tree constructor
function constructKDtree(pointLst, hi, low, axis) {
	if (low >= hi) {return new kdnode({ x : pointLst[low].x, y : pointLst[low].y, z : pointLst[low].z });}
	low = low < 0 ? 0 : low;
	hi = hi >= pointLst.length ? pointLst.length - 1 : hi;
	
	// Sort point list and choose median as pivot element
	let medianIndex = getpivot(pointLst, hi, low, axis), node = new kdnode(pointLst[medianIndex]);
	let quickpartition = partition(pointLst, hi, low, medianIndex, axis, [true]), left = quickpartition[0], right = quickpartition[1];
    
	// Create node and construct subtree
	node.shape = pointLst[medianIndex];
	node.left = constructKDtree(pointLst, low, left - 1, (axis + 1) % 3 + 1);
	if (node.left.shape.x == node.shape.x && node.left.shape.y == node.shape.y && node.left.shape.z == node.shape.z) { node.left = null; }
	node.right = constructKDtree(pointLst, right + 1, hi, (axis + 1) % 3 + 1);
	if (node.right.shape.x == node.shape.x && node.right.shape.y == node.shape.y && node.right.shape.z == node.shape.z) { node.right = null; }
	return node;
}

function searchNearNeighbors(tree, point, axis, nearestNghbor) {
	if (!tree) { return nearestNghbor; }
	let best = nearestNghbor, bestDist = getdist(point, nearestNghbor), curDist = getdist(point, tree.shape), diff, close, away;
	
	if (!best || curDist < bestDist) { best = tree.shape; }
	
	diff = (axis == 1) ? point.x - tree.shape.x : (axis == 2) ? point.y - tree.shape.y : point.z - tree.shape.z;
	close = diff <= 0 ? tree.left : tree.right; away = diff <= 0 ? tree.right : tree.left;
	
	best = searchNearNeighbors(close, point, (axis + 1) % 3 + 1, best);
	if (diff * diff < bestDist) { best = searchNearNeighbors(away, point, (axis + 1) % 3 + 1, best); }
	return best;
}

function findNearestNeighbor(pointLst, pointIdx) { const tree = constructkdtree(pointLst, pointLst.length - 1, 1, 1); return searchNearNeighbors(tree, pointLst[pointIdx], 1, tree.shape); }

var points = [{x : 10, y : 20, z : 3}, {x : -50, y : 35, z : -7}, {x : -24, y : 57, z : 20}, {x : -15, y : 8, z : 17}, {x : 9, y : 9, z : 9}], kdtree1 = constructKDtree(points, points.length, 0, 1);
