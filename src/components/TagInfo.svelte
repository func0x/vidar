<script>
  export let text;
  export let live = false;
  export let vna = false; // video not available
  export let fp = false; // timeframe (filder panel)
  export let featured = false; // ALREADY STREAMED ... DAYS AGO
</script>

<span class:live class:featured class:vna class:fp>{text}</span>

<style>
  span {
    background-color: var(--white);
    align-self: flex-start;
    font-size: var(--font-s);
    color: var(--black);
    padding: 10px;
    text-transform: uppercase;
    border-radius: var(--border-radius-xl);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .live {
    background-color: var(--green);
    color: var(--black);
  }

  .vna {
    background-color: var(--grey-200);
    position: absolute;
    left: 15px;
    top: 15px;
  }

  .fp {
    background-color: var(--grey-300);
    color: var(--white);
  }

  @media screen and (max-width: 1114px) {
    span {
      left: 15px;
      top: 15px;
    }

    .fp {
      position: static;
    }

    .featured {
      position: initial;
      margin: 25px 0 0 15px;
    }
  }
</style>
