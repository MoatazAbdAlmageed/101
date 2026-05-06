# Divide and Conquer Example: Merge Sort

def merge_sort(arr):
    """
    Implementation of Merge Sort using the Divide and Conquer paradigm.
    """
    if len(arr) <= 1:
        return arr

    # 1. Divide: Find the middle point
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # 2. Conquer: Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # 3. Combine: Merge the sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result

if __name__ == "__main__":
    test_arr = [38, 27, 43, 3, 9, 82, 10]
    print(f"Original array: {test_arr}")
    sorted_arr = merge_sort(test_arr)
    print(f"Sorted array:   {sorted_arr}")
