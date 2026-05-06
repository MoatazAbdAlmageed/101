const visualizer = document.getElementById('visualizer');
const algoSelect = document.getElementById('algo-select');
const sizeSlider = document.getElementById('size-slider');
const speedSlider = document.getElementById('speed-slider');
const resetBtn = document.getElementById('reset-btn');
const startBtn = document.getElementById('start-btn');
const compDisplay = document.getElementById('comp-count');
const swapDisplay = document.getElementById('swap-count');
const complexityDisplay = document.getElementById('time-complexity');

let array = [];
let comparisons = 0;
let swaps = 0;
let isSorting = false;

// Initialize
function init() {
    generateArray();
    
    resetBtn.onclick = () => {
        if (!isSorting) generateArray();
    };
    
    startBtn.onclick = startSorting;
    
    sizeSlider.oninput = () => {
        if (!isSorting) generateArray();
    };
    
    algoSelect.onchange = updateComplexity;
}

function generateArray() {
    const size = sizeSlider.value;
    array = [];
    visualizer.innerHTML = '';
    comparisons = 0;
    swaps = 0;
    updateStats();
    
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}%`;
        bar.style.width = `${100 / size}%`;
        visualizer.appendChild(bar);
    }
}

function updateStats() {
    compDisplay.innerText = comparisons;
    swapDisplay.innerText = swaps;
}

function updateComplexity() {
    const algo = algoSelect.value;
    const complexities = {
        bubble: 'O(N²)',
        selection: 'O(N²)',
        insertion: 'O(N²)',
        quick: 'O(N log N)',
        merge: 'O(N log N)'
    };
    complexityDisplay.innerText = complexities[algo];
}

async function startSorting() {
    if (isSorting) return;
    isSorting = true;
    disableControls(true);
    
    const algo = algoSelect.value;
    const bars = document.querySelectorAll('.bar');
    
    if (algo === 'bubble') await bubbleSort(bars);
    else if (algo === 'selection') await selectionSort(bars);
    else if (algo === 'insertion') await insertionSort(bars);
    else if (algo === 'quick') await quickSort(bars, 0, array.length - 1);
    else if (algo === 'merge') await mergeSort(bars, 0, array.length - 1);
    
    markSorted(bars);
    isSorting = false;
    disableControls(false);
}

function disableControls(disabled) {
    startBtn.disabled = disabled;
    resetBtn.disabled = disabled;
    sizeSlider.disabled = disabled;
    algoSelect.disabled = disabled;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, 101 - speedSlider.value));

// --- Sorting Algorithms ---

async function bubbleSort(bars) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'var(--bar-compare)';
            bars[j+1].style.backgroundColor = 'var(--bar-compare)';
            
            comparisons++;
            updateStats();
            await sleep();
            
            if (array[j] > array[j+1]) {
                swaps++;
                updateStats();
                [array[j], array[j+1]] = [array[j+1], array[j]];
                bars[j].style.height = `${array[j]}%`;
                bars[j+1].style.height = `${array[j+1]}%`;
                bars[j].style.backgroundColor = 'var(--bar-swap)';
                bars[j+1].style.backgroundColor = 'var(--bar-swap)';
                await sleep();
            }
            
            bars[j].style.backgroundColor = 'var(--primary-color)';
            bars[j+1].style.backgroundColor = 'var(--primary-color)';
        }
        bars[array.length - i - 1].style.backgroundColor = 'var(--bar-sorted)';
    }
}

async function selectionSort(bars) {
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = 'var(--accent-color)';
        
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'var(--bar-compare)';
            comparisons++;
            updateStats();
            await sleep();
            
            if (array[j] < array[minIdx]) {
                if (minIdx !== i) bars[minIdx].style.backgroundColor = 'var(--primary-color)';
                minIdx = j;
                bars[minIdx].style.backgroundColor = 'var(--bar-swap)';
            } else {
                bars[j].style.backgroundColor = 'var(--primary-color)';
            }
        }
        
        if (minIdx !== i) {
            swaps++;
            updateStats();
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i]}%`;
            bars[minIdx].style.height = `${array[minIdx]}%`;
        }
        
        bars[minIdx].style.backgroundColor = 'var(--primary-color)';
        bars[i].style.backgroundColor = 'var(--bar-sorted)';
    }
}

async function insertionSort(bars) {
    bars[0].style.backgroundColor = 'var(--bar-sorted)';
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        bars[i].style.backgroundColor = 'var(--bar-compare)';
        await sleep();
        
        while (j >= 0 && array[j] > key) {
            comparisons++;
            swaps++;
            updateStats();
            bars[j+1].style.height = `${array[j]}%`;
            array[j+1] = array[j];
            bars[j].style.backgroundColor = 'var(--bar-swap)';
            j--;
            await sleep();
            for(let k=i; k>j; k--) bars[k].style.backgroundColor = 'var(--bar-sorted)';
        }
        array[j+1] = key;
        bars[j+1].style.height = `${key}%`;
        bars[i].style.backgroundColor = 'var(--bar-sorted)';
    }
}

async function quickSort(bars, low, high) {
    if (low < high) {
        let pivotIdx = await partition(bars, low, high);
        await quickSort(bars, low, pivotIdx - 1);
        await quickSort(bars, pivotIdx + 1, high);
    }
}

async function partition(bars, low, high) {
    let pivot = array[high];
    bars[high].style.backgroundColor = 'var(--accent-color)';
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'var(--bar-compare)';
        comparisons++;
        updateStats();
        await sleep();
        
        if (array[j] < pivot) {
            i++;
            swaps++;
            updateStats();
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}%`;
            bars[j].style.height = `${array[j]}%`;
            bars[i].style.backgroundColor = 'var(--bar-swap)';
            bars[j].style.backgroundColor = 'var(--bar-swap)';
            await sleep();
            bars[i].style.backgroundColor = 'var(--primary-color)';
        }
        bars[j].style.backgroundColor = 'var(--primary-color)';
    }
    
    swaps++;
    updateStats();
    [array[i+1], array[high]] = [array[high], array[i+1]];
    bars[i+1].style.height = `${array[i+1]}%`;
    bars[high].style.height = `${array[high]}%`;
    bars[high].style.backgroundColor = 'var(--primary-color)';
    bars[i+1].style.backgroundColor = 'var(--bar-sorted)';
    
    return i + 1;
}

// Simplified Merge Sort for visualization
async function mergeSort(bars, l, r) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(bars, l, m);
    await mergeSort(bars, m + 1, r);
    await merge(bars, l, m, r);
}

async function merge(bars, l, m, r) {
    let left = array.slice(l, m + 1);
    let right = array.slice(m + 1, r + 1);
    
    let i = 0, j = 0, k = l;
    
    while (i < left.length && j < right.length) {
        comparisons++;
        updateStats();
        bars[k].style.backgroundColor = 'var(--bar-compare)';
        await sleep();
        
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        bars[k].style.height = `${array[k]}%`;
        bars[k].style.backgroundColor = 'var(--bar-sorted)';
        k++;
    }
    
    while (i < left.length) {
        array[k] = left[i];
        bars[k].style.height = `${array[k]}%`;
        bars[k].style.backgroundColor = 'var(--bar-sorted)';
        i++; k++;
    }
    
    while (j < right.length) {
        array[k] = right[j];
        bars[k].style.height = `${array[k]}%`;
        bars[k].style.backgroundColor = 'var(--bar-sorted)';
        j++; k++;
    }
}

function markSorted(bars) {
    bars.forEach(bar => bar.style.backgroundColor = 'var(--bar-sorted)');
}

init();
updateComplexity();
