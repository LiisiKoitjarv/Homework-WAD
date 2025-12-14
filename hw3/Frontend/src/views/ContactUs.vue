<template>
  <div class="contact">
    <h1>Contact us</h1>

    <p>If you have any questions, feel free to contact us.</p>

    <ul>
      <li>Email: example@example.com</li>
      <li>Phone: +372 5555 5555</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContactUs"
}
</script>

<style scoped>
.contact {
  background-color: aliceblue;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.contact h2 {
  margin-top: 0;
  font-size: 1.5em;
  color: #005a9c;
}

.contact p {
  margin: 10px 0;
  line-height: 1.6;
}

.contact ul {
  padding-left: 20px;
  margin: 10px 0;
}

.contact li {
  margin-bottom: 6px;
}
</style>

