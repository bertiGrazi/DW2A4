<template>
  <div class="order">
    <form>
      <!-- User data -->
      <div class="user-data">
        <p class="section-title">Seus Dados</p>
        <!-- Name -->
        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid()"
            :class="{ error: !formData.name.valid }"
          />
          <p class="error-message" v-if="!formData.name.valid">
            {{ formData.name.errorMessage }}
          </p>
        </div>
        <!-- Cellphone -->
        <div class="input-field">
          <label for="">{{ formData.cellphone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellphone.placeholder"
            v-mask="'(##) # ####-####'"
            v-model="formData.cellphone.value"
            @blur="formData.cellphone.isValid()"
            :class="{ error: !formData.cellphone.valid }"
          />
          <p class="error-message" v-if="!formData.cellphone.valid">
            {{ formData.cellphone.errorMessage }}
          </p>
        </div>
      </div>
      <!-- Adress-->
      <div class="adress">
        <p class="section-title">Endereço</p>
        <div class="radio-container">
          <!-- store-->
          <div class="radio-options">
            <input
              type="radio"
              name="delivery-type"
              id="store"
              value="store"
              v-model="deliveryType"
            />
            <label for="store">Retirar na loja</label>
          </div>

          <div class="radio-options">
            <!-- delivery-->
            <input
              type="radio"
              name="delivery-type"
              id="delivery"
              value="delivery"
              v-model="deliveryType"
            />
            <label for="delivery">Delivery</label>
          </div>
        </div>
        <!-- Adress Card-->
        <div class="adress-card" v-if="isDeliveryType && savedAdress">
          <p>{{ formData.city.value }} - {{ formData.cep.value }}</p>
          <p>{{ formData.street.value }}, {{ formData.number.value }}</p>
        </div>
        <!-- a Link-->
        <a @click="onShowAddressModal" v-if="isDeliveryType">{{
          adressButtonLabel
        }}</a>
      </div>
      <!-- Payment-->
      <div class="payment">
        <p class="section-title">Pagamento</p>
        <p>Método de pagamento</p>
        <!-- Card-->
        <div class="radio-container">
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="credit-card"
              value="credit-card"
              v-model="paymentType"
            />
            <label for="store">Cartão</label>
          </div>
          <!-- Cash-->
          <div class="radio-options">
            <input
              type="radio"
              name="payment-type"
              id="cash"
              value="cash"
              v-model="paymentType"
            />
            <label for="store">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>
    <button class="primary-button" @click="orderItens">
      Concluir seu pedido
    </button>

    <Modal :show="showAdressModal" @on-modal-close="hideAdressModal">
      <div class="modal-content">
        <h1>Adicionar endereço</h1>
        <!-- CEP -->
        <div class="input-field">
          <label for="">{{ formData.cep.label }}</label>
          <input
            type="text"
            :placeholder="formData.cep.placeholder"
            v-mask="'#####-###'"
            v-model="formData.cep.value"
            @blur="formData.cep.isValid()"
            :class="{ error: !formData.cep.valid }"
          />
          <p class="error-message" v-if="!formData.cep.valid">
            {{ formData.cep.errorMessage }}
          </p>
        </div>
        <!-- City -->
        <div class="input-field">
          <label for="">{{ formData.city.label }}</label>
          <input
            type="text"
            :placeholder="formData.city.placeholder"
            v-model="formData.city.value"
            @blur="formData.city.isValid()"
            :class="{ error: !formData.city.valid }"
          />
          <p class="error-message" v-if="!formData.city.valid">
            {{ formData.city.errorMessage }}
          </p>
        </div>
        <!-- Street and Number-->
        <div class="adress-container">
          <!-- Street-->
          <div class="input-field">
            <label for="">{{ formData.street.label }}</label>
            <input
              type="text"
              :placeholder="formData.street.placeholder"
              v-model="formData.street.value"
              @blur="formData.street.isValid()"
              :class="{ error: !formData.street.valid }"
            />
            <p class="error-message" v-if="!formData.street.valid">
              {{ formData.street.errorMessage }}
            </p>
          </div>
          <!-- Number-->
          <div class="input-field">
            <label for="">{{ formData.number.label }}</label>
            <input
              type="text"
              :placeholder="formData.number.placeholder"
              v-mask="'#####'"
              v-model="formData.number.value"
              @blur="formData.number.isValid()"
              :class="{ error: !formData.number.valid }"
            />
            <p class="error-message" v-if="!formData.number.valid">
              {{ formData.number.errorMessage }}
            </p>
          </div>
        </div>

        <button class="secondary-button" @click="hideAdressModal">
          Cancelar
        </button>
        <button class="primary-button" @click="validateAddressForm">
          Adicionar
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        name: {
          value: "",
          placeholder: "Digite seu nome",
          errorMessage: "O nome é obrigatório",
          label: "Nome",
          valid: true,
          isValid: () => {
            this.formData.name.valid = this.formData.name.value.length;
          },
        },
        cellphone: {
          value: "",
          placeholder: "(xx) xxxxx-xxxx",
          errorMessage: "O celular é obrigatório",
          label: "Celular",
          valid: true,
          isValid: () => {
            this.formData.cellphone.valid =
              this.formData.cellphone.value.length === 16;
          },
        },
        cep: {
          value: "",
          placeholder: "Digite seu cep",
          errorMessage: "O cep é obrigatório",
          label: "CEP*",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          placeholder: "Digite sua cidade",
          errorMessage: "A cidade é obrigatória",
          label: "Cidade*",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          placeholder: "Digite sua rua",
          errorMessage: "A rua é obrigatória",
          label: "Rua*",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          placeholder: "Número",
          errorMessage: "O número é obrigatória",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
      },
      showAdressModal: false,
      deliveryType: "store",
      savedAdress: false,
      paymentType: "credit-card",
    };
  },
  computed: {
    isAdressFormValid() {
      let isValid = true;

      isValid &= this.formData.cep.valid;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === "delivery";
    },
    hasAdressInfo() {
      return (
        this.formData.cep.value ||
        this.formData.city.value ||
        this.formData.street.value ||
        this.formData.number.value
      );
    },
    adressButtonLabel() {
      return this.hasAdressInfo ? "Editar endereço" : "Adicionar Endereço";
    },
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.cellphone.isValid();
    },
    triggerAdressFormValidations() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },
    orderItens() {
      this.triggerValidations();
    },
    onShowAddressModal() {
      this.showAdressModal = true;
    },
    hideAdressModal() {
      this.showAdressModal = false;
    },
    validateAddressForm() {
      this.triggerAdressFormValidations();
      if (!this.isAdressFormValid) return;
      this.savedAdress = true;
      this.showAdressModal = false;
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 720px;
  margin: 30px auto;
  background: white;
  border-radius: 8px;
  padding: 30px 50px;

  .input-field {
    display: flex;
    flex-direction: column;

    label {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 5px;
    }

    & + .input-field {
      margin-top: 10px;
    }

    .error-message {
      font-size: 12px;
      color: @error-color;
    }
  }

  .adress-container {
    display: flex;
    margin-top: 10px;

    .input-field {
      margin: 0;
      width: 100%;

      & + .input-field {
        width: 30%;
        margin-left: 15px;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;

    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .radio-container {
      display: flex;
    }

    .adress {
      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        display: block;
        margin: 15px 0;
        width: fit-content;
      }

      .adress-card {
        border-radius: 8px;
        border: 1px solid @dark-grey;
        padding: 10px;
        margin: 5px 0;
        width: fit-content;

        p {
          font-weight: normal;
          font-size: 14px;
          color: @dark-grey;
        }
      }
    }

    .radio-options {
      display: flex;
      align-items: center;

      & + .radio-options {
        margin-left: 25px;
      }

      label {
        padding-left: 10px;
        margin: 0px;
      }
    }
  }

  button {
    margin: 30px auto;
  }

  .modal-content {
    button {
      text-align: center;
      cursor: pointer;
      & + button {
        margin-left: 15px;
      }
    }
  }

  @media @smartphones {
    width: 100%;
    padding: 0;

    .modal-content {
      button {
        cursor: pointer;
        & + button {
          text-align: center;
          margin-left: 5px;
        }
      }
    }

    .adress-container {
      .input-field + .input-field {
        margin-left: 5px;
      }
    }
  }
}
</style>
