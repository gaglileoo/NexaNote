<script>
  let { href, iconClass, bgClass, iconColorClass, title, text } = $props();
</script>

<a href={href} class="card h-100 text-decoration-none hover-shadow">
  <div class="card-body text-center p-4">
    <div class={"icon-wrapper " + bgClass + " rounded-circle p-3 mb-3 mx-auto"} style="width: 60px; height: 60px;">
      <i class={"bi " + iconClass + " fs-3 " + iconColorClass}></i>
    </div>
    <h5 class="card-title">{title}</h5>
    <p class="card-text text-muted small">{text}</p>
  </div>
</a>


<style>
  /* Einfache Hover-Effekte */
  .hover-shadow:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }
  .bg-purple {
    background-color: #6f42c1;
  }
  .text-purple {
    color: #6f42c1;
  }
  .icon-wrapper i {
    line-height: 1;
  }
</style>
