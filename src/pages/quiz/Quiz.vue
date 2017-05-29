<template>
<div class="container">
  <!-- <h1>Oefen tentamen</h1> -->

  <div class="container fixed-top">
    <p>je hebt van de {{ totalQuestions }} vragen, {{ totalAnswered }} beantwoord!</p>
    <div class="progress">
      <div class="progress-bar" role="progressbar" v-bind:style="{ width: percentComplete }" v-bind:aria-valuenow="totalAnswered" v-bind:aria-valuemax="totalQuestions" aria-valuemin="0"></div>
    </div>
  </div>

  <div class="card" v-for="(question, index) in questions">
    <div class="card-block">
      <p class="card-text">{{question.text}}</p>
      <form>
        <fieldset class="form-group row">
          <legend class="col-form-legend col-sm-2">Antwoord</legend>
          <div class="col-sm-10">
            <div class="form-check" v-for="(answer, index) in question.answers">
              <label class="form-check-label">
               <input class="form-check-input" @click="selectedAnswer(index)" type="radio" name="gridRadios" id="gridRadios1">
               {{answer.text}}
             </label>
            </div>
          </div>
        </fieldset>
        <button @click="submit(index, $event)" class="btn btn-primary">Submit</button>
        <div v-show="question.status.answered">
          <div v-if="question.status.correct">
            <div class="alert alert-success" role="alert">
              <a class="alert-link">Goed!</a>
              <p>{{question.description}}</p>
            </div>
          </div>
          <div v-else>
            <div class="alert alert-danger" role="alert">
              <a class="alert-link">Fout!</a>
              <p>{{question.description}}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

</div>
</template>

<script>
import db from '../../database'
export default {
  name: 'hello',
  data() {
    return {}
  },
  firebase: {
    questions: db.ref('questions')
  },
  computed: {
    // questions: function() {
    //   return this.questions
    // },
    totalQuestions: function() {
      return this.questions.length
    },
    totalAnswered: function() {
      const answered = this.questions.filter(question => question.status.answered)
      return answered.length
    },
    percentComplete: function() {
      return (this.totalAnswered / this.totalQuestions) * 100 + '%'
    }
  },
  methods: {
    selectedAnswer(index) {
      this.selectedAnswerIndex = index
    },
    submit(index, e) {
      e.preventDefault()
      const currentQuestion = this.questions[index]
      const answered = currentQuestion.answers[this.selectedAnswerIndex]
      this.questions[index].status.answered = true
      this.questions[index].status.correct = answered.correct
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  margin-top: 15px;
}

.fixed-top {
  position: fixed !important;
  z-index: 2;
  background-color: white;
  border-bottom: 2px solid #0275d8;
  padding: 10px;
  top: 0;
}

.alert {
  margin-top: 15px;
  font-size: 22px;
  text-align: left;
}

.alert p {
  font-size: 18px;
}

.quiz-status {
  z-index: 2;
  width: inherit;
  padding: 20px;
  /*height: 300px;*/
  text-align: center;
  /*position: relative;*/
  position: fixed;
  top: 0;
  /*overflow: hidden;*/
  @include transition(all .5s ease);
}
</style>
