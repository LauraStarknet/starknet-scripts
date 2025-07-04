
document.addEventListener('DOMContentLoaded', function() {
  const categoryElement = document.getElementById('current-category');
  const slugElement = document.getElementById('current-slug');
  if (!categoryElement || !slugElement) {
    console.error('Error: #current-category or #current-slug element not found.');
    return;
  }
  const currentPageCategory = categoryElement.textContent.trim();
  const currentPageSlug = slugElement.textContent.trim();
  // console.log('Current Page - Category:', `"${currentPageCategory}"`, 'Slug:', `"${currentPageSlug}"`);
  const sliderContainer = document.querySelector('.slider');
  if (!sliderContainer) {
    console.error('Error: Slider container with class ".slider" not found.');
    return;
  }
  const allItemsInCMSOrder = sliderContainer.querySelectorAll('.blog-post-wrapper');
  let potentiallyVisibleItems = [];
  // First, filter by category and exclude current slug
  allItemsInCMSOrder.forEach(function(item) {
    const itemCategoryElement = item.querySelector('.category');
    const itemSlugElement = item.querySelector('.slug');
    if (itemCategoryElement && itemSlugElement) {
      const itemCategory = itemCategoryElement.textContent.trim();
      const itemSlug = itemSlugElement.textContent.trim();
      if (itemCategory === currentPageCategory && itemSlug !== currentPageSlug || itemCategory === "Ecosystem" && currentPageCategory === "Case Studies" && itemSlug !== currentPageSlug ) {
        potentiallyVisibleItems.push(item); // Add matching items to a new array
      }
    }
  });
  // Hide all items initially
  allItemsInCMSOrder.forEach(function(item) {
    item.style.display = 'none';
  });
  // Now take the first 5 from the already sorted (by Webflow) and category-filtered list
  let visibleItemsCount = 0;
  for (let i = 0; i < potentiallyVisibleItems.length && i < 5; i++) {
    potentiallyVisibleItems[i].style.display = ''; // Show item
    visibleItemsCount++;
  }
  console.log('Total visible items after filtering (max 5, sorted by Webflow):', visibleItemsCount);
  if (visibleItemsCount > 0) {
    console.log('Slider should now be initialized with ' + visibleItemsCount + ' filtered items.');
    // YOUR SLIDER INITIALIZATION CODE (e.g., for Flickity) GOES HERE.
    // Example for Flickity (ensure it's adapted to your full options):
    // let flktyInstance = Flickity.data(sliderContainer);
    // if (flktyInstance) {
    //   flktyInstance.destroy();
    // }
    // new Flickity(sliderContainer, { cellSelector: '.blog-post-wrapper', /* your options */ });
  } else {
    console.log('No items to display in slider for category:', `"${currentPageCategory}"`);
    // sliderContainer.innerHTML = '<p>No related items found in this category.</p>';
  }
});
