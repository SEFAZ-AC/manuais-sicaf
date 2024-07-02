export function closeDrawer(): void {
  const drawerElement = document.getElementById("drawer") as HTMLInputElement;
  if (drawerElement) {
    drawerElement.checked = false;
  }
}
