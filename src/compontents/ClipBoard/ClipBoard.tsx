import { Toast } from "antd-mobile";
import ClipboardJS from "clipboard";
import { Component } from "react";

type Props = {
  text: string;
  /**复制成功信息，默认“已复制” */
  message?: string;
  fallback: JSX.Element;
  onSuccess?: () => void;
  children: React.ReactNode
};

type State = {
  clipboardable?: boolean;
};

export default class ClipBoard extends Component<Props, State> {
  ref: any;
  clipboard: ClipboardJS | undefined;

  componentDidMount() {
    if (ClipboardJS.isSupported()) {
      this.clipboard = new ClipboardJS(this.ref);
      this.clipboard.on("success", (e) => {
        e.clearSelection();
        Toast.show({
			content: this.props.message || "已复制"
		});
        this.props.onSuccess?.();
      });

      this.clipboard.on("error", (e) => {
        console.log("拷贝失败", e);
      });
      this.setState({
        clipboardable: true,
      });
    }
  }

  componentWillUnmount(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  state = {
    clipboardable: undefined,
  };

  render() {
    return (
      <span
        data-clipboard-text={this.props.text}
        ref={(ref) => (this.ref = ref)}
      >
        {this.state.clipboardable ? this.props.children : this.props.fallback}
      </span>
    );
  }
}
